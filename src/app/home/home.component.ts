import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import * as AOS from 'aos'; 


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    AOS.init();
  }
  title = 'tech-chef-web';
  collapsed = true;
  images = [944, 1011, 984].map((n) => `https://foodservicemagazine.es/wp-content/uploads/2017/08/restaurantes-tecnologicos.jpg`);


}
