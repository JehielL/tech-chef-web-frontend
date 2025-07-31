import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Aos from 'aos';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-comercial-services',
  standalone: true,
  imports: [],
  templateUrl: './comercial-services.component.html',
  styleUrl: './comercial-services.component.css'
})
export class ComercialServicesComponent implements OnInit, AfterViewChecked {

  activedLoader = true;
  @ViewChild('skills') skillsElement!: ElementRef;
  @ViewChild('headline', { static: false }) headline!: ElementRef;
  animationTriggered = false;

 
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
  
      gsap.from('.word', {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.09,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }
}