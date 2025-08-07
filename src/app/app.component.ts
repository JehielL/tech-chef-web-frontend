import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ChatbotUiComponent } from "./chatbot-ui/chatbot-ui.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, ChatbotUiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tech-chef-web';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private meta: Meta
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const route = this.getChild(this.activatedRoute);
        route.data.subscribe(data => {
          const title = data['title'] || 'Bite Software';
          const desc = data['description'] || 'Bite Software - Digitalización para Hostelería';
          const canonicalPath = data['canonical'] || this.router.url;
          const origin = window?.location?.origin || 'https://bitesoftware.vercel.app';
          const canonicalUrl = `${origin}${canonicalPath}`;
          this.titleService.setTitle(title);
          this.meta.updateTag({ name: 'description', content: desc });
          this.meta.updateTag({ property: 'og:title', content: title });
          this.meta.updateTag({ property: 'og:description', content: desc });
          this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
          // Canonical link
          let linkEl = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
          if (!linkEl) {
            linkEl = document.createElement('link');
            linkEl.setAttribute('rel', 'canonical');
            document.head.appendChild(linkEl);
          }
          linkEl.setAttribute('href', canonicalUrl);
        });
      }
    });
  }

  private getChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
