import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Emotion {
  name: string;
  score: number;
}

interface Polarity {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

interface AnalysisResults {
  emotions: Emotion[];
  polarity: Polarity;
  keywords: string[];
  confidence: number;
}

@Component({
  selector: 'app-prediccion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './prediccion.component.html',
  styleUrl: './prediccion.component.css'
})
export class PrediccionComponent {
  reviewText: string = '';
  analysisResults: AnalysisResults | null = null;
  isAnalyzing: boolean = false;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  async analyzeText() {
    if (!this.reviewText.trim()) {
      this.errorMessage = 'Por favor, ingresa un texto para analizar.';
      return;
    }

    this.isAnalyzing = true;
    this.errorMessage = '';
    this.analysisResults = null;

    try {
      // Llamar al backend real
      const response = await this.apiService.classifyTexts([this.reviewText]).toPromise();
      const result = response.results[0];

      // Adaptar la respuesta del backend al formato que espera el frontend
      this.analysisResults = {
        emotions: result.translated_labels.map((label: string, i: number) => ({
          name: label.charAt(0).toUpperCase() + label.slice(1),
          score: Math.round((result.probabilities[result.predicted_labels[i]] || 0) * 100)
        })),
        polarity: {
          sentiment: this.getSentimentFromLabels(result.translated_labels),
          score: this.getPolarityScore(result.probabilities)
        },
        keywords: this.extractKeywords(result.input),
        confidence: this.getConfidence(result.probabilities)
      };
    } catch (error) {
      this.errorMessage = 'Error al analizar el texto. Por favor, intenta de nuevo.';
      console.error('Error en análisis:', error);
    } finally {
      this.isAnalyzing = false;
    }
  }

  // Métodos auxiliares para adaptar la respuesta del backend
  private getSentimentFromLabels(labels: string[]): 'positive' | 'negative' | 'neutral' {
    const positiveLabels = ['alegría', 'amor', 'gratitud', 'satisfacción', 'felicidad'];
    const negativeLabels = ['tristeza', 'enojo', 'duelo', 'frustración', 'miedo', 'confusión'];
    
    for (const label of labels) {
      if (positiveLabels.includes(label.toLowerCase())) return 'positive';
      if (negativeLabels.includes(label.toLowerCase())) return 'negative';
    }
    return 'neutral';
  }

  private getPolarityScore(probabilities: {[key: string]: number}): number {
    const max = Math.max(...Object.values(probabilities));
    return Math.round(max * 100);
  }

  private getConfidence(probabilities: {[key: string]: number}): number {
    const max = Math.max(...Object.values(probabilities));
    return Math.round(max * 100);
  }

  private extractKeywords(text: string): string[] {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
  }

  getPolarityDescription(): string {
    if (!this.analysisResults) return '';
    
    const { sentiment, score } = this.analysisResults.polarity;
    
    switch (sentiment) {
      case 'positive':
        if (score > 80) return 'El texto expresa sentimientos muy positivos y satisfacción.';
        return 'El texto tiene un tono generalmente positivo.';
      case 'negative':
        if (score > 80) return 'El texto expresa sentimientos muy negativos y descontento.';
        return 'El texto tiene un tono generalmente negativo.';
      case 'neutral':
        return 'El texto mantiene un tono neutral sin emociones extremas.';
      default:
        return '';
    }
  }

  getTextQuality(): string {
    if (!this.reviewText) return 'N/A';
    
    const length = this.reviewText.length;
    const wordCount = this.reviewText.split(/\s+/).length;
    
    if (length < 20) return 'Muy corto';
    if (length < 50) return 'Corto';
    if (length < 150) return 'Medio';
    if (length < 300) return 'Bueno';
    return 'Excelente';
  }

  loadExample(type: 'positive' | 'negative' | 'mixed') {
    const examples = {
      positive: '¡Excelente servicio! El producto superó todas mis expectativas. La calidad es increíble y el envío fue muy rápido. Definitivamente lo recomendaría a todos mis amigos. Estoy muy satisfecho con la compra.',
      negative: 'Terrible experiencia. El producto llegó dañado y el servicio al cliente fue pésimo. No respondieron a mis correos y cuando finalmente lo hicieron, fueron muy groseros. No lo recomiendo para nada.',
      mixed: 'El producto es bueno en general, pero el envío tardó más de lo esperado. El precio está bien, pero la atención al cliente podría mejorar. En general estoy satisfecho pero hay aspectos que podrían ser mejores.'
    };
    
    this.reviewText = examples[type];
    this.analysisResults = null;
    this.errorMessage = '';
  }

  clearText() {
    this.reviewText = '';
    this.analysisResults = null;
    this.errorMessage = '';
  }
}