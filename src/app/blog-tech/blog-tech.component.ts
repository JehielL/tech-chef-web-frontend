import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-tech',
  standalone: true,
  imports: [],
  templateUrl: './blog-tech.component.html',
  styleUrl: './blog-tech.component.css'
})
export class BlogTechComponent implements OnInit {

  activedLoader = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.activedLoader = false;
    }, 2300); 
    window.scrollTo(0, 0); 
  }
}
