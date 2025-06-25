import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, TimeoutError } from 'rxjs';
import { catchError, timeout, retry, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment'; 

export interface EmotionAnalysis {
  emotions: Array<{
    name: string;
    score: number;
  }>;
  polarity: {
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  };
  keywords: string[];
  confidence: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrls = environment.apiUrls;
  private currentApiUrl = environment.defaultApiUrl;
  private requestTimeout = environment.apiTimeout;

  constructor(private http: HttpClient) { 
    console.log('Configuración API:', {
      apiUrls: this.apiUrls,
      currentUrl: this.currentApiUrl,
      timeout: this.requestTimeout
    });
  }

  // Método para análisis de texto (nuevo)
  analyzeText(text: string): Observable<EmotionAnalysis> {
    const payload = { text };
    
    return this.http.post<EmotionAnalysis>(`${this.currentApiUrl}/analyze-text/`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        this.rotateApiUrl();
        return this.handleApiError(error, () => this.http.post<EmotionAnalysis>(`${this.currentApiUrl}/analyze-text/`, payload));
      })
    );
  }

  // Método para análisis de emociones específico
  analyzeEmotions(text: string): Observable<any> {
    const payload = { text };
    
    return this.http.post(`${this.currentApiUrl}/analyze-emotions/`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        this.rotateApiUrl();
        return this.handleApiError(error, () => this.http.post(`${this.currentApiUrl}/analyze-emotions/`, payload));
      })
    );
  }

  // Método para análisis de polaridad específico
  analyzePolarity(text: string): Observable<any> {
    const payload = { text };
    
    return this.http.post(`${this.currentApiUrl}/analyze-polarity/`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        this.rotateApiUrl();
        return this.handleApiError(error, () => this.http.post(`${this.currentApiUrl}/analyze-polarity/`, payload));
      })
    );
  }

  // Método para extraer palabras clave
  extractKeywords(text: string): Observable<any> {
    const payload = { text };
    
    return this.http.post(`${this.currentApiUrl}/extract-keywords/`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        this.rotateApiUrl();
        return this.handleApiError(error, () => this.http.post(`${this.currentApiUrl}/extract-keywords/`, payload));
      })
    );
  }

  // Método legacy para análisis de imágenes (mantenido por compatibilidad)
  analyzeImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.currentApiUrl}/upload-image/`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        this.rotateApiUrl();
        return this.handleApiError(error, () => this.http.post(`${this.currentApiUrl}/upload-image/`, formData));
      })
    );
  }

  checkBackendHealth(): Observable<any> {
    return this.http.get(`${this.currentApiUrl}/health-check`).pipe(
      timeout(5000),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return this.handleApiError(error, () => 
          this.http.get(`${this.currentApiUrl}/health-check`)
        );
      })
    );
  }

  // Método para clasificar textos con el modelo de emociones
  classifyTexts(texts: string[]): Observable<any> {
    const payload = { texts };
    console.log('Enviando al backend:', payload);
    console.log('URL del backend:', `${this.currentApiUrl}/classify`);
    
    return this.http.post(`${this.currentApiUrl}/classify`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en classifyTexts:', error);
        console.error('Status:', error.status);
        console.error('StatusText:', error.statusText);
        console.error('Error body:', error.error);
        this.rotateApiUrl();
        return this.handleApiError(error, () => this.http.post(`${this.currentApiUrl}/classify`, payload));
      })
    );
  }

  private handleApiError(error: HttpErrorResponse, retryFn: () => Observable<any>): Observable<any> {
    if (error.status === 0 || error instanceof TimeoutError) {
      this.rotateApiUrl();
      return throwError(() => this.getConnectionError());
    } else if (error.status === 400) {
      return throwError(() => 'Texto no válido o demasiado corto para analizar');
    } else if (error.status === 500) {
      return throwError(() => 'Error interno del servidor al procesar el texto');
    }
    return throwError(() => `Error inesperado: ${error.message}`);
  }

  private getConnectionError(): string {
    return `No se pudo conectar con el servidor backend. Verifica:
      - Que el servidor esté corriendo en ${this.currentApiUrl}
      - Que no haya problemas de red o firewall
      - Que el backend esté accesible`;
  }

  private rotateApiUrl(): void {
    const currentIndex = this.apiUrls.indexOf(this.currentApiUrl);
    this.currentApiUrl = this.apiUrls[(currentIndex + 1) % this.apiUrls.length];
    console.log('Alternando URL a:', this.currentApiUrl);
  }
}