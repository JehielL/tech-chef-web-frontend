import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DropdownHoverSimpleDirective } from '../shared';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, RouterLink, CommonModule, DropdownHoverSimpleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  isScrolled = false;
  isTop = true;
  isHidden = false;
  
  private lastScrollPosition = 0;
  private scrollTimeout: any;

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.handleScroll();
  }

  private handleScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Considera que está en el top si está en los primeros 50px
    this.isTop = scrollPosition < 50;
    
    // Considera que hay scroll si está más abajo de 100px
    this.isScrolled = scrollPosition > 100;
    
    // Lógica de ocultación automática - estilo macOS
    if (scrollPosition > 200) { // Solo aplicar después de 200px de scroll
      // Cancelar timeout anterior si existe
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      
      // Mostrar navbar mientras se hace scroll
      this.isHidden = false;
      
      // Ocultar después de 2 segundos sin scroll
      this.scrollTimeout = setTimeout(() => {
        // Solo ocultar si no estamos en el top y hay scroll considerable
        if (!this.isTop && scrollPosition > 200) {
          this.isHidden = true;
        }
      }, 2000);
    } else {
      // Si estamos cerca del top, nunca ocultar
      this.isHidden = false;
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
    }
    
    this.lastScrollPosition = scrollPosition;
  }

  private checkScrollPosition() {
    this.handleScroll();
  }

  // Método para mostrar navbar al hacer hover
  onNavbarHover() {
    this.isHidden = false;
    // Cancelar timeout de ocultación mientras se hace hover
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  // Método para manejar cuando se quita el hover
  onNavbarLeave() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Solo ocultar si estamos lejos del top
    if (scrollPosition > 200 && !this.isTop) {
      this.scrollTimeout = setTimeout(() => {
        this.isHidden = true;
      }, 1000); // Esperar 1 segundo después de quitar el hover
    }
  }
}
