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
      // Simular análisis con datos de ejemplo
      await this.simulateAnalysis();
    } catch (error) {
      this.errorMessage = 'Error al analizar el texto. Por favor, intenta de nuevo.';
      console.error('Error en análisis:', error);
    } finally {
      this.isAnalyzing = false;
    }
  }

  private async simulateAnalysis() {
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Análisis de sentimientos basado en palabras clave
    const text = this.reviewText.toLowerCase();
    const positiveWords = ['excelente', 'bueno', 'genial', 'fantástico', 'maravilloso', 'perfecto', 'recomiendo', 'satisfecho', 'contento', 'feliz'];
    const negativeWords = ['terrible', 'malo', 'pésimo', 'horrible', 'decepcionado', 'enojado', 'frustrado', 'molesto', 'no recomiendo', 'insatisfecho'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (text.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (text.includes(word)) negativeCount++;
    });

    // Determinar polaridad
    let sentiment: 'positive' | 'negative' | 'neutral';
    let polarityScore: number;
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      polarityScore = Math.min(90, 60 + (positiveCount * 10));
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      polarityScore = Math.min(90, 60 + (negativeCount * 10));
    } else {
      sentiment = 'neutral';
      polarityScore = 50;
    }

    // Generar emociones basadas en el texto
    const emotions: Emotion[] = this.generateEmotions(text, sentiment);
    
    // Extraer palabras clave
    const keywords = this.extractKeywords(text);
    
    // Calcular confianza
    const confidence = this.calculateConfidence(text, emotions, sentiment);

    this.analysisResults = {
      emotions,
      polarity: {
        sentiment,
        score: polarityScore
      },
      keywords,
      confidence
    };
  }

  private generateEmotions(text: string, sentiment: string): Emotion[] {
    const emotions: Emotion[] = [];
    
    // Alegría
    const joyWords = ['feliz', 'contento', 'alegre', 'satisfecho', 'excelente', 'genial', 'fantástico'];
    const joyScore = this.calculateEmotionScore(text, joyWords);
    if (joyScore > 0) emotions.push({ name: 'Alegría', score: joyScore });

    // Tristeza
    const sadnessWords = ['triste', 'decepcionado', 'insatisfecho', 'malo', 'pésimo'];
    const sadnessScore = this.calculateEmotionScore(text, sadnessWords);
    if (sadnessScore > 0) emotions.push({ name: 'Tristeza', score: sadnessScore });

    // Enojo
    const angerWords = ['enojado', 'frustrado', 'molesto', 'terrible', 'horrible', 'ira'];
    const angerScore = this.calculateEmotionScore(text, angerWords);
    if (angerScore > 0) emotions.push({ name: 'Enojo', score: angerScore });

    // Sorpresa
    const surpriseWords = ['sorprendido', 'asombrado', 'increíble', 'increíble', 'wow'];
    const surpriseScore = this.calculateEmotionScore(text, surpriseWords);
    if (surpriseScore > 0) emotions.push({ name: 'Sorpresa', score: surpriseScore });

    // Miedo
    const fearWords = ['preocupado', 'temeroso', 'asustado', 'nervioso', 'ansioso'];
    const fearScore = this.calculateEmotionScore(text, fearWords);
    if (fearScore > 0) emotions.push({ name: 'Miedo', score: fearScore });

    // Neutral (si no hay emociones fuertes)
    if (emotions.length === 0 || emotions.every(e => e.score < 30)) {
      emotions.push({ name: 'Neutral', score: 70 });
    }

    // Ordenar por score y limitar a 4 emociones principales
    return emotions
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }

  private calculateEmotionScore(text: string, emotionWords: string[]): number {
    let score = 0;
    emotionWords.forEach(word => {
      if (text.includes(word)) {
        score += 20;
      }
    });
    return Math.min(95, score);
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

  private calculateConfidence(text: string, emotions: Emotion[], sentiment: string): number {
    let confidence = 70; // Base confidence
    
    // Aumentar confianza basado en la longitud del texto
    if (text.length > 100) confidence += 10;
    if (text.length > 200) confidence += 5;
    
    // Aumentar confianza si hay emociones claras
    if (emotions.some(e => e.score > 50)) confidence += 10;
    
    // Aumentar confianza si la polaridad es clara
    if (sentiment !== 'neutral') confidence += 5;
    
    return Math.min(95, confidence);
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