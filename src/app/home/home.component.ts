import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'tech-chef-web';
  collapsed = true;
  images = [944, 1011, 984].map((n) => `https://foodservicemagazine.es/wp-content/uploads/2017/08/restaurantes-tecnologicos.jpg`);


}
