import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-emprendimiento',
  standalone: true,
  imports: [],
  templateUrl: './blog-emprendimiento.component.html',
  styleUrl: './blog-emprendimiento.component.css'
})
export class BlogEmprendimientoComponent {

  activedLoader = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.activedLoader = false;
    }, 2300); 
    window.scrollTo(0, 0); 
  }
}
