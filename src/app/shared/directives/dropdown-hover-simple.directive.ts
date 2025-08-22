import { Directive, HostListener, Input, OnDestroy, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Directiva que replica el comportamiento de navegación profesional como NFQ
 * Hover inmediato en desktop, click en móvil
 */
@Directive({
  selector: '[appDropdownHoverSimple]',
  standalone: true
})
export class DropdownHoverSimpleDirective implements OnInit, OnDestroy {
  /** Delay mínimo antes de cerrar (para evitar cierres accidentales) */
  @Input() hoverDelay = 100;
  
  /** Breakpoint en px para determinar si es móvil */
  @Input() mobileBreakpoint = 992;
  
  private isMobile = false;
  private timeoutId?: number;
  private resizeSubscription?: Subscription;
  private dropdownToggle?: HTMLElement;
  private dropdownMenu?: HTMLElement;
  private isOpen = false;
  
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    this.checkIfMobile();
    this.setupDropdownElements();
    this.setupToleranceArea();
    
    // Escucha cambios de tamaño de ventana
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => this.checkIfMobile());
  }
  
  /**
   * Abre el dropdown INMEDIATAMENTE al hacer hover (como NFQ)
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.isMobile) {
      this.clearTimeout();
      this.openDropdown();
    }
  }
  
  /**
   * Cierra el dropdown con delay mínimo al salir
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.isMobile) {
      this.timeoutId = window.setTimeout(() => {
        this.closeDropdown();
      }, this.hoverDelay);
    }
  }
  
  ngOnDestroy(): void {
    this.clearTimeout();
    this.resizeSubscription?.unsubscribe();
  }
  
  private setupDropdownElements(): void {
    const element = this.elementRef.nativeElement;
    this.dropdownToggle = element.querySelector('[ngbDropdownToggle]');
    this.dropdownMenu = element.querySelector('[ngbDropdownMenu]');
    
    // Agregar event listeners directos al menú para mantenerlo abierto
    if (this.dropdownMenu) {
      this.renderer.listen(this.dropdownMenu, 'mouseenter', () => {
        if (!this.isMobile) {
          this.clearTimeout();
        }
      });
      
      this.renderer.listen(this.dropdownMenu, 'mouseleave', () => {
        if (!this.isMobile) {
          this.timeoutId = window.setTimeout(() => {
            this.closeDropdown();
          }, this.hoverDelay);
        }
      });
    }
  }
  
  private setupToleranceArea(): void {
    // Crear área de tolerancia invisible para mejorar UX
    const toleranceArea = this.renderer.createElement('div');
    this.renderer.setStyle(toleranceArea, 'position', 'absolute');
    this.renderer.setStyle(toleranceArea, 'top', '100%');
    this.renderer.setStyle(toleranceArea, 'left', '0');
    this.renderer.setStyle(toleranceArea, 'right', '0');
    this.renderer.setStyle(toleranceArea, 'height', '10px');
    this.renderer.setStyle(toleranceArea, 'background', 'transparent');
    this.renderer.setStyle(toleranceArea, 'z-index', '1000');
    this.renderer.setStyle(toleranceArea, 'pointer-events', 'auto');
    
    this.renderer.appendChild(this.elementRef.nativeElement, toleranceArea);
    
    // Event listeners para el área de tolerancia
    this.renderer.listen(toleranceArea, 'mouseenter', () => {
      if (!this.isMobile) {
        this.clearTimeout();
      }
    });
  }
  
  private openDropdown(): void {
    if (this.dropdownMenu && !this.isOpen) {
      this.renderer.addClass(this.dropdownMenu, 'show');
      this.renderer.setStyle(this.dropdownMenu, 'display', 'block');
      this.isOpen = true;
      
      // Añadir clase para animaciones CSS
      this.renderer.addClass(this.elementRef.nativeElement, 'dropdown-open');
    }
  }
  
  private closeDropdown(): void {
    if (this.dropdownMenu && this.isOpen) {
      this.renderer.removeClass(this.dropdownMenu, 'show');
      this.renderer.setStyle(this.dropdownMenu, 'display', 'none');
      this.isOpen = false;
      
      // Remover clase de animación
      this.renderer.removeClass(this.elementRef.nativeElement, 'dropdown-open');
    }
  }
  
  private checkIfMobile(): void {
    this.isMobile = window.innerWidth < this.mobileBreakpoint;
  }
  
  private clearTimeout(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
