import { Component, OnInit, AfterViewInit, ElementRef, HostListener, OnDestroy, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-marketing-services',
  imports: [CommonModule],
  templateUrl: './marketing-services.component.html',
  styleUrl: './marketing-services.component.css'
})
export class MarketingServicesComponent implements OnInit, AfterViewInit, OnDestroy {

  private isMobile = false;
  private cleanupCallbacks: Array<() => void> = [];

  private injectedJsonLdEl?: HTMLScriptElement;

  constructor(
    private elementRef: ElementRef,
    private title: Title,
    private meta: Meta,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile();
    this.setupMobileCards();
  }

  ngOnInit() {
    // Registrar plugins de GSAP
    gsap.registerPlugin(ScrollTrigger);
    this.checkMobile();
    this.setSeoForMarketingServices();
  }

  ngAfterViewInit() {
    // Dar tiempo para que el DOM se renderice
    setTimeout(() => {
      this.initializeAnimations();
      this.setupMobileCards();
      this.enableAnchorSmoothScroll();
      this.setupHeroParallax();
    }, 100);
  }

  ngOnDestroy(): void {
    // Limpieza de listeners
    this.cleanupCallbacks.forEach((fn) => {
      try { fn(); } catch {}
    });
    this.cleanupCallbacks = [];
    // Kill all ScrollTriggers creados por este componente
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }

  private setSeoForMarketingServices() {
    const pageTitle = 'Marketing Hostelero Profesional | Servicios para Restaurantes - Bite Software';
    const pageDesc = 'Estrategias de marketing para hostelería: redes sociales, fotografía gastronómica, campañas y branding. Aumenta tus reservas y ventas con expertos.';
    const origin = window?.location?.origin || 'https://bitesoftware.vercel.app';
    const canonicalUrl = `${origin}${this.router.url || '/comercial-services'}`;
    const image = `${origin}/assets/logo-bs-removebg.png`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDesc });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDesc });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDesc });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Canonical link
    let linkEl = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = this.document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      this.document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonicalUrl);

    // JSON-LD Service markup
    if (this.injectedJsonLdEl) {
      this.injectedJsonLdEl.remove();
    }
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Marketing para Restaurantes',
      'provider': {
        '@type': 'Organization',
        'name': 'Bite Software'
      },
      'areaServed': 'ES',
      'serviceType': 'Marketing hostelero',
      'description': pageDesc,
      'url': canonicalUrl
    } as const;
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
    this.injectedJsonLdEl = script;
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  private setupMobileCards() {
    if (this.isMobile) {
      // En móvil, convertir las cartas a sistema de click/tap
      const serviceCards = this.elementRef.nativeElement.querySelectorAll('.service-card');
      
      serviceCards.forEach((card: HTMLElement) => {
        // Remover listeners previos
        card.removeEventListener('click', this.handleCardClick);
        
        // Agregar listener para click/tap en móvil
        card.addEventListener('click', this.handleCardClick.bind(this));
        
        // Asegurar que empiece en estado front
        card.classList.remove('expanded');
        const front = card.querySelector('.service-card-front') as HTMLElement;
        const back = card.querySelector('.service-card-back') as HTMLElement;
        if (front && back) {
          front.style.display = 'flex';
          back.style.display = 'none';
        }
      });
    } else {
      // En desktop, remover listeners de click y usar hover normal
      const serviceCards = this.elementRef.nativeElement.querySelectorAll('.service-card');
      serviceCards.forEach((card: HTMLElement) => {
        card.removeEventListener('click', this.handleCardClick);
        card.classList.remove('expanded');
        const front = card.querySelector('.service-card-front') as HTMLElement;
        const back = card.querySelector('.service-card-back') as HTMLElement;
        if (front && back) {
          front.style.display = '';
          back.style.display = '';
        }
      });
    }
  }

  private handleCardClick(event: Event) {
    if (!this.isMobile) return;
    
    event.preventDefault();
    const card = event.currentTarget as HTMLElement;
    
    // Cerrar otras cartas abiertas
    const allCards = this.elementRef.nativeElement.querySelectorAll('.service-card');
    allCards.forEach((otherCard: HTMLElement) => {
      if (otherCard !== card) {
        otherCard.classList.remove('expanded');
      }
    });
    
    // Toggle de la carta actual
    card.classList.toggle('expanded');
    const front = card.querySelector('.service-card-front') as HTMLElement;
    const back = card.querySelector('.service-card-back') as HTMLElement;
    if (front && back) {
      const isExpanded = card.classList.contains('expanded');
      front.style.display = isExpanded ? 'none' : 'flex';
      back.style.display = isExpanded ? 'flex' : 'none';
    }
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

  private enableAnchorSmoothScroll() {
    const anchors = this.elementRef.nativeElement.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor: HTMLAnchorElement) => {
      const handler = (e: Event) => {
        const hash = anchor.getAttribute('href') || '';
        if (!hash || hash === '#') return;
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          const yOffset = -10; // pequeño offset
          const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
      anchor.addEventListener('click', handler);
      this.cleanupCallbacks.push(() => anchor.removeEventListener('click', handler));
    });
  }

  private setupHeroParallax() {
    if (this.isMobile) {
      return;
    }
    const hero = this.elementRef.nativeElement.querySelector('.marketing-hero') as HTMLElement;
    const graphic = this.elementRef.nativeElement.querySelector('.hero-graphic') as HTMLElement;
    const text = this.elementRef.nativeElement.querySelector('.hero-text') as HTMLElement;

    if (hero && graphic) {
      // Parallax sutil con scroll
      gsap.to(graphic, {
        y: -40,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    }

    if (text) {
      gsap.to(text, {
        y: -20,
        opacity: 0.98,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4
        }
      });
    }

    // Tilt por movimiento del mouse en desktop
    if (!this.isMobile && graphic) {
      const onMouseMove = (ev: MouseEvent) => {
        const rect = graphic.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (ev.clientX - cx) / rect.width;
        const dy = (ev.clientY - cy) / rect.height;
        gsap.to(graphic, { duration: 0.4, rotateX: dy * -8, rotateY: dx * 8, transformPerspective: 800, transformOrigin: 'center' });
      };
      const onMouseLeave = () => {
        gsap.to(graphic, { duration: 0.5, rotateX: 0, rotateY: 0 });
      };
      hero.addEventListener('mousemove', onMouseMove);
      hero.addEventListener('mouseleave', onMouseLeave);
      this.cleanupCallbacks.push(() => hero.removeEventListener('mousemove', onMouseMove));
      this.cleanupCallbacks.push(() => hero.removeEventListener('mouseleave', onMouseLeave));
    }
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
          toggleActions: "play none none none"
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
