import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Aos from 'aos';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Interfaces para el dashboard
interface DashboardMetric {
  label: string;
  value: string | number;
  trend?: string;
  alert?: string;
  type: 'currency' | 'number' | 'percentage' | 'text';
}

interface ChartData {
  label: string;
  value: number;
  isActive?: boolean;
}

interface Notification {
  icon: string;
  text: string;
  timestamp?: Date;
  type: 'info' | 'warning' | 'success';
}

interface DashboardData {
  isLive: boolean;
  metrics: DashboardMetric[];
  chartData: ChartData[];
  notifications: Notification[];
  lastUpdate: Date;
}

@Component({
  selector: 'app-comercial-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comercial-services.component.html',
  styleUrl: './comercial-services.component.css'
})
export class ComercialServicesComponent implements OnInit, AfterViewChecked, OnDestroy {

  activedLoader = true;
  @ViewChild('skills') skillsElement!: ElementRef;
  @ViewChild('headline', { static: false }) headline!: ElementRef;
  animationTriggered = false;
  horizontalScrollInitialized = false;
  private resizeTimeout: any;
  private horizontalScrollTrigger: any = null;

  // Dashboard Data
  dashboardData: DashboardData = {
    isLive: true,
    metrics: [
      {
        label: 'Ventas Hoy',
        value: 2847,
        trend: '+15%',
        type: 'currency'
      },
      {
        label: 'Pedidos',
        value: 127,
        trend: '+8%',
        type: 'number'
      },
      {
        label: 'Stock Crítico',
        value: 3,
        alert: '⚠️',
        type: 'number'
      },
      {
        label: 'Eficiencia',
        value: 94,
        trend: '+2%',
        type: 'percentage'
      }
    ],
    chartData: [
      { label: '10:00', value: 40 },
      { label: '11:00', value: 65 },
      { label: '12:00', value: 80 },
      { label: '13:00', value: 90 },
      { label: '14:00', value: 95, isActive: true },
      { label: '15:00', value: 70 }
    ],
    notifications: [
      {
        icon: '🔔',
        text: 'Nuevo pedido - Mesa 7',
        type: 'info',
        timestamp: new Date()
      },
      {
        icon: '📊',
        text: 'Inventario actualizado',
        type: 'success',
        timestamp: new Date()
      }
    ],
    lastUpdate: new Date()
  };

 
  constructor() {}
  
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
          
          // VERSION SIMPLIFICADA - Solo lo básico
          const animation = gsap.to(horizontalPanels, {
            x: () => -scrollDistance,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSection,
              pin: true,
              scrub: 1,
              end: () => `+=${scrollDistance}`,
              refreshPriority: -1,
              // Añadir un pequeño offset en mobile para evitar solapamiento
              invalidateOnRefresh: true,
              onRefresh: () => {
                const newDistance = horizontalPanels.scrollWidth - window.innerWidth;
                console.log('Refreshed - New distance:', newDistance, 'Mobile:', isMobile);
              }
            }
          });

          // Guardar referencia para poder limpiarla específicamente
          this.horizontalScrollTrigger = animation.scrollTrigger;

          console.log('Horizontal scroll initialized/updated');
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

  // Métodos para el Dashboard
  formatMetricValue(metric: DashboardMetric): string {
    switch (metric.type) {
      case 'currency':
        return `€${metric.value.toLocaleString()}`;
      case 'percentage':
        return `${metric.value}%`;
      case 'number':
        return metric.value.toString();
      default:
        return metric.value.toString();
    }
  }

  getMetricTrend(metric: DashboardMetric): string {
    return metric.trend || metric.alert || '';
  }

  getMetricTrendClass(metric: DashboardMetric): string {
    if (metric.alert) return 'metric-alert';
    if (metric.trend?.startsWith('+')) return 'metric-trend trend-up';
    if (metric.trend?.startsWith('-')) return 'metric-trend trend-down';
    return 'metric-trend';
  }

  // Simular actualizaciones en tiempo real (para cuando integres APIs reales)
  simulateRealTimeUpdates(): void {
    setInterval(() => {
      // Actualizar métricas aleatorias
      const randomMetric = Math.floor(Math.random() * this.dashboardData.metrics.length);
      const metric = this.dashboardData.metrics[randomMetric];
      
      if (metric.type === 'currency') {
        const currentValue = Number(metric.value);
        const change = Math.floor(Math.random() * 200) - 100; // -100 a +100
        metric.value = Math.max(0, currentValue + change);
      } else if (metric.type === 'number' && metric.label !== 'Stock Crítico') {
        const currentValue = Number(metric.value);
        const change = Math.floor(Math.random() * 10) - 5; // -5 a +5
        metric.value = Math.max(0, currentValue + change);
      }

      // Actualizar gráfico
      this.dashboardData.chartData = this.dashboardData.chartData.map((item, index) => ({
        ...item,
        value: Math.max(20, Math.min(100, item.value + (Math.random() * 10 - 5))),
        isActive: index === 4 // Mantener el quinto elemento como activo
      }));

      // Actualizar timestamp
      this.dashboardData.lastUpdate = new Date();
    }, 5000); // Actualizar cada 5 segundos
  }

  // Método para conectar con API real (placeholder)
  async loadRealDashboardData(): Promise<void> {
    try {
      // TODO: Reemplazar con llamada a API real
      // const response = await this.dashboardService.getDashboardData();
      // this.dashboardData = response;
      
      console.log('Conectar aquí con API real para obtener datos del dashboard');
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    }
  }

  // Método para refrescar datos
  refreshDashboard(): void {
    this.loadRealDashboardData();
  }
}