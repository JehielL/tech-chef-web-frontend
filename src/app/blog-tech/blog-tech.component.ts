import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-blog-tech',
  standalone: true,
  imports: [],
  templateUrl: './blog-tech.component.html',
  styleUrl: './blog-tech.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BlogTechComponent implements OnInit {

  activedLoader = true;
  
  ngOnInit(): void {
    // Inicializar AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });

    setTimeout(() => {
      this.activedLoader = false;
      // Refresh AOS después de cargar
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }, 2300); 
    
    window.scrollTo(0, 0); 
  }
}
