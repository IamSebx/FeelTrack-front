import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prediccion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prediccion.component.html',
  styleUrls: ['./prediccion.component.css']
})
export class PrediccionComponent {
  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  isLoading: boolean = false;
  result: any = null;
  errorMessage: string | null = null;
  isDragOver: boolean = false;

  constructor() {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  processFile(file: File): void {
    if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
      this.errorMessage = 'Formato de archivo no válido. Por favor, suba una imagen (JPG, PNG).';
      return;
    }
    
    this.resetState();
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  analizar(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.result = null;
    this.errorMessage = null;

    // Simular llamada a la API con un timeout
    setTimeout(() => {
      // Mock de una respuesta exitosa
      this.result = {
        predictions: [
          { species: 'Ciervo Rojo (Cervus elaphus)', confidence: 92.3 },
          { species: 'Corzo (Capreolus capreolus)', confidence: 5.1 },
          { species: 'Gamo (Dama dama)', confidence: 1.8 },
        ]
      };
      this.isLoading = false;

      // Para probar el estado de error, descomente la siguiente sección:
      /*
      this.errorMessage = "El modelo no pudo clasificar esta imagen. Intente con una imagen más clara.";
      this.result = null;
      this.isLoading = false;
      */
    }, 2500);
  }

  resetState(): void {
    this.result = null;
    this.errorMessage = null;
    this.selectedFile = null;
    this.imagePreviewUrl = null;
    this.isLoading = false;
  }
}