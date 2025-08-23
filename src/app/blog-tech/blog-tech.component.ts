import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-blog-tech',
  standalone: true,
  imports: [],
  templateUrl: './blog-tech.component.html',
  styleUrl: './blog-tech.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BlogTechComponent implements OnInit, AfterViewInit {

  activedLoader = true;
  
  ngOnInit(): void {
    // Inicializar AOS con configuración simple para debugging
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
      offset: 120
    });

    setTimeout(() => {
      this.activedLoader = false;
    }, 2300); 
    
    window.scrollTo(0, 0); 
  }

  ngAfterViewInit(): void {
    // Refresh AOS después de que todo esté renderizado
    setTimeout(() => {
      AOS.refresh();
      console.log('AOS refreshed - cards should animate now');
    }, 400);
  }
}
