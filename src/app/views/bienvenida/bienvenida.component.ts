import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';
import { FadeInDirective } from '../../animations/fade-in.directive';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FadeInDirective],
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {
   constructor() { }

  ngOnInit(): void {
    AOS.init({ // Inicializa AOS
      duration: 1000, // Duración de la animación en ms
      once: true, // La animación solo ocurre una vez
    });
  }
}
