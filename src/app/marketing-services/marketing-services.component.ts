import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-marketing-services',
  imports: [CommonModule],
  templateUrl: './marketing-services.component.html',
  styleUrl: './marketing-services.component.css'
})
export class MarketingServicesComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Registrar plugins de GSAP
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    // Dar tiempo para que el DOM se renderice
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  private initializeAnimations() {
    console.log('Inicializando animaciones GSAP...');
    
    // HERO ÉPICO CARICATURESCO - Inspirado en el home
    const heroTimeline = gsap.timeline();
    
    // Logo/Icono principal que "explota" en pantalla
    heroTimeline
      .from('.hero-emoji', { 
        duration: 0.8,
        scale: 0,
        rotation: 720,
        ease: "back.out(2.5)"
      })
      .from('.hero-title span', { 
        duration: 1.2, 
        y: 100, 
        opacity: 0, 
        rotation: 15,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2
      }, "-=0.4")
      .from('.hero-subtitle', { 
        duration: 1, 
        y: 50, 
        opacity: 0, 
        scale: 0.8,
        ease: "bounce.out" 
      }, "-=0.8")
      .from('.hero-decorations .decoration', {
        duration: 1.5,
        scale: 0,
        rotation: 360,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.1
      }, "-=1");

    // Partículas flotantes MÁS CARICATURESCAS
    gsap.to('.float-element', {
      y: -40,
      x: 20,
      rotation: 720,
      scale: 1.2,
      duration: 4,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Bounce continuo en elementos flotantes
    gsap.to('.float-element', {
      rotation: "+=360",
      duration: 8,
      ease: "none",
      repeat: -1,
      stagger: 0.5
    });

    // TARJETAS DE SERVICIOS - Solo animación de entrada
    const serviceCards = this.elementRef.nativeElement.querySelectorAll('.service-card');
    
    serviceCards.forEach((card: HTMLElement, index: number) => {
      // Solo animación de entrada
      gsap.from(card, {
        duration: 1,
        y: 100,
        opacity: 0,
        rotation: 10,
        scale: 0.8,
        ease: "bounce.out",
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Hover animations deshabilitadas temporalmente
      // this.setupCardHover(card);
    });

    // WALLBOARD de polaroids con efecto scatter
    this.setupPolaroidWallboard();

    // ESTADÍSTICAS con counter animado
    this.animateStats();

    // CTA final con efecto llamativo
    gsap.from('.cta-content', {
      duration: 1.2,
      scale: 0.5,
      opacity: 0,
      rotation: 15,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: '.cta-content',
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    console.log('Animaciones GSAP + AOS inicializadas correctamente');
  }

  private setupCardHover(card: HTMLElement) {
    const details = card.querySelector('.service-details') as HTMLElement;
    const icon = card.querySelector('.service-icon') as HTMLElement;
    
    if (!details) return;

    card.addEventListener('mouseenter', () => {
      gsap.to(card, { 
        duration: 0.6, 
        y: -8, 
        scale: 1.02,
        rotation: 0.5,
        ease: "power2.out" 
      });
      
      if (icon) {
        gsap.to(icon, {
          duration: 0.5,
          scale: 1.15,
          rotation: 5,
          ease: "power2.out"
        });
      }
      
      gsap.to(details, { 
        duration: 0.6, 
        opacity: 1, 
        maxHeight: '400px',
        ease: "power2.out" 
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { 
        duration: 0.5, 
        y: 0, 
        scale: 1,
        rotation: 0,
        ease: "power2.out" 
      });
      
      if (icon) {
        gsap.to(icon, {
          duration: 0.4,
          scale: 1,
          rotation: 0,
          ease: "power2.out"
        });
      }
      
      gsap.to(details, { 
        duration: 0.4, 
        opacity: 0, 
        maxHeight: '0px',
        ease: "power2.out" 
      });
    });
  }

  private setupPolaroidWallboard() {
    const polaroids = this.elementRef.nativeElement.querySelectorAll('.polaroid');
    
    polaroids.forEach((polaroid: HTMLElement, index: number) => {
      // Posición inicial aleatoria y rotación
      const randomRotation = (Math.random() - 0.5) * 20;
      const randomY = Math.random() * 30 - 15;
      
      gsap.set(polaroid, {
        rotation: randomRotation,
        y: randomY
      });

      // Animación de entrada con efecto scatter
      gsap.from(polaroid, {
        duration: 1.2,
        scale: 0,
        opacity: 0,
        rotation: randomRotation + 360,
        ease: "elastic.out(1, 0.5)",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: polaroid,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Hover effect para polaroids
      polaroid.addEventListener('mouseenter', () => {
        gsap.to(polaroid, {
          duration: 0.3,
          scale: 1.1,
          rotation: 0,
          y: -10,
          ease: "power2.out",
          zIndex: 100
        });
      });

      polaroid.addEventListener('mouseleave', () => {
        gsap.to(polaroid, {
          duration: 0.3,
          scale: 1,
          rotation: randomRotation,
          y: randomY,
          ease: "power2.out",
          zIndex: 1
        });
      });

      // Click para abrir en grande
      polaroid.addEventListener('click', () => {
        this.openPolaroidModal(polaroid);
      });
    });
  }

  private animateStats() {
    const statNumbers = this.elementRef.nativeElement.querySelectorAll('.stat-number');
    
    statNumbers.forEach((statNumber: HTMLElement) => {
      const finalNumber = statNumber.textContent || '0';
      const numericValue = parseInt(finalNumber.replace(/[^\d]/g, '')) || 0;
      
      // Counter animation
      gsap.from({ value: 0 }, {
        duration: 2,
        value: numericValue,
        ease: "power2.out",
        onUpdate: function() {
          const currentValue = Math.round((this as any)['targets']()[0].value);
          if (finalNumber.includes('%')) {
            statNumber.textContent = currentValue + '%';
          } else if (finalNumber.includes('M+')) {
            statNumber.textContent = currentValue + 'M+';
          } else if (finalNumber.includes('+')) {
            statNumber.textContent = currentValue + '+';
          } else {
            statNumber.textContent = currentValue.toString();
          }
        },
        scrollTrigger: {
          trigger: statNumber,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Bounce effect
      gsap.from(statNumber.parentElement, {
        duration: 0.8,
        scale: 0.5,
        opacity: 0,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: statNumber,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }

  private openPolaroidModal(polaroid: HTMLElement) {
    // Crear modal overlay
    const modal = document.createElement('div');
    modal.className = 'polaroid-modal';
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <img src="${polaroid.querySelector('img')?.src || ''}" alt="Proyecto" />
        <div class="modal-info">
          <h3>${polaroid.querySelector('.polaroid-title')?.textContent || ''}</h3>
          <p>${polaroid.querySelector('.polaroid-desc')?.textContent || ''}</p>
        </div>
        <button class="modal-close" onclick="this.closest('.polaroid-modal').remove()">×</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animación de entrada del modal
    gsap.from(modal.querySelector('.modal-content'), {
      duration: 0.5,
      scale: 0.5,
      opacity: 0,
      ease: "back.out(1.7)"
    });
  }
}
