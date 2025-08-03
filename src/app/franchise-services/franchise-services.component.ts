import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Aos from 'aos';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-franchise-services',
  standalone: true,
  imports: [],
  templateUrl: './franchise-services.component.html',
  styleUrl: './franchise-services.component.css'
})
export class FranchiseServicesComponent implements OnInit, AfterViewChecked, OnDestroy {


  activedLoader = true;
  @ViewChild('skills') skillsElement!: ElementRef;
  @ViewChild('headline', { static: false }) headline!: ElementRef;
  animationTriggered = false;
  horizontalScrollInitialized = false;
  private resizeTimeout: any;
  private horizontalScrollTrigger: any = null;


  constructor() { }

  ngOnInit(): void {
    Aos.init({
      duration: 2000,
      easing: 'ease-out',
      once: true
    });
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.activedLoader = false;

    }, 2000);

  }


  // GSAP Animation
  ngAfterViewChecked(): void {
    if (!this.activedLoader && this.headline && !this.animationTriggered) {
      this.animationTriggered = true;

      const element = this.headline.nativeElement;

      const wrapTextNodes = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent?.split(/(\s+)/) || [];

          const fragment = document.createDocumentFragment();
          words.forEach(word => {
            if (word.trim() === '') {
              fragment.appendChild(document.createTextNode(word));
            } else {
              const span = document.createElement('span');
              span.className = 'word';
              span.textContent = word;
              fragment.appendChild(span);
            }
          });

          node.parentNode?.replaceChild(fragment, node);
        }

        else if (node.nodeType === Node.ELEMENT_NODE) {
          const elementNode = node as HTMLElement;

          if (elementNode.tagName.toLowerCase() === 'strong' && elementNode.classList.contains('customstrong')) {
            const newChildren: Node[] = [];

            elementNode.childNodes.forEach(child => {
              if (child.nodeType === Node.TEXT_NODE) {
                const words = child.textContent?.split(/(\s+)/) || [];

                words.forEach(word => {
                  if (word.trim() === '') {
                    newChildren.push(document.createTextNode(word));
                  } else {
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.textContent = word;
                    newChildren.push(span);
                  }
                });
              } else {
                newChildren.push(child);
              }
            });

            // Limpiar y volver a insertar los spans dentro del strong
            elementNode.innerHTML = '';
            newChildren.forEach(n => elementNode.appendChild(n));
          }

          Array.from(node.childNodes).forEach(child => wrapTextNodes(child));
        }
      };

      wrapTextNodes(element);

      // Configurar la animación GSAP más suave
      gsap.registerPlugin(ScrollTrigger);

      const words = element.querySelectorAll('.word');

      // Asegurar que todas las palabras estén inicialmente ocultas
      gsap.set(words, {
        opacity: 0,
        y: 30,
        scale: 0.8
      });

      gsap.to(words, {
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          toggleActions: "play none none none",
          once: true
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: {
          amount: 3.5,
          ease: "power2.inOut"
        },
        duration: 1.8,
        ease: 'power2.out'
      });

      // Inicializar scroll horizontal después de la animación del headline
      this.initHorizontalScroll();
    }
  }

  private initHorizontalScroll(): void {
    if (this.horizontalScrollInitialized) return;
    this.horizontalScrollInitialized = true;

    // Esperar un poco para asegurar que el DOM esté listo
    setTimeout(() => {
      const horizontalSection = document.querySelector('.horizontal-scroll-section');
      const horizontalPanels = document.querySelector('.horizontal-panels');

      if (horizontalSection && horizontalPanels) {
        // Función para crear/actualizar la animación
        const createScrollAnimation = () => {
          // Solo limpiar la animación horizontal anterior
          if (this.horizontalScrollTrigger) {
            this.horizontalScrollTrigger.kill();
          }

          // Recalcular dimensiones
          const scrollDistance = horizontalPanels.scrollWidth - window.innerWidth;
          const isMobile = window.innerWidth <= 768;

          // CONFIGURACIÓN INVERSA - De izquierda a derecha
          // Comenzar desde la posición final y mover hacia 0
          gsap.set(horizontalPanels, { x: -scrollDistance });
          
          const animation = gsap.to(horizontalPanels, {
            x: 0, // Moverse hacia la posición inicial (derecha)
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSection,
              pin: true,
              scrub: 1,
              end: () => `+=${scrollDistance}`,
              refreshPriority: -1,
              invalidateOnRefresh: true,
              onRefresh: () => {
                const newDistance = horizontalPanels.scrollWidth - window.innerWidth;
                console.log('Refreshed - New distance (L to R):', newDistance, 'Mobile:', isMobile);
              }
            }
          });

          // Guardar referencia para poder limpiarla específicamente
          this.horizontalScrollTrigger = animation.scrollTrigger;

          console.log('Horizontal scroll initialized/updated (Left to Right)');
          console.log('ScrollWidth:', horizontalPanels.scrollWidth);
          console.log('Window width:', window.innerWidth);
          console.log('Distance:', scrollDistance);
          console.log('Is mobile:', window.innerWidth <= 768);
        };

        // Crear animación inicial
        createScrollAnimation();

        // Listener para resize para responsive
        const handleResize = () => {
          // Debounce para evitar múltiples llamadas
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = setTimeout(() => {
            console.log('Resize detected, updating scroll animation');
            createScrollAnimation();
            ScrollTrigger.refresh();
          }, 250);
        };

        window.addEventListener('resize', handleResize);

        // Limpiar el listener cuando sea necesario
        setTimeout(() => {
          // Refresh adicional para asegurar cálculos correctos
          ScrollTrigger.refresh();
        }, 500);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    // Limpiar listeners y timeouts
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    // Solo limpiar el ScrollTrigger del scroll horizontal
    if (this.horizontalScrollTrigger) {
      this.horizontalScrollTrigger.kill();
    }
  }
}
