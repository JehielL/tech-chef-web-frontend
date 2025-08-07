import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogTechComponent } from './blog-tech/blog-tech.component';
import { BlogEmprendimientoComponent } from './blog-emprendimiento/blog-emprendimiento.component';
import { BlogDesarrolloComponent } from './blog-desarrollo/blog-desarrollo.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { ComercialServicesComponent } from './comercial-services/comercial-services.component';
import { FranchiseServicesComponent } from './franchise-services/franchise-services.component';
import { MarketingServicesComponent } from './marketing-services/marketing-services.component';

export const routes: Routes = [

    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Bite Software | Automatización y Digitalización para Hostelería',
            description: 'Soluciones de software para hostelería: reservas inteligentes, gestión integral, inventarios y escandallos automáticos.',
            canonical: '/home'
        }
    }
    ,
    {
        path: 'blog-tech',
        component: BlogTechComponent,
        data: {
            title: 'Blog Tech | Bite Software',
            description: 'Tendencias tecnológicas aplicadas a hostelería, automatización y digitalización.',
            canonical: '/blog-tech'
        }
    },
    {

        path: 'blog-tech/emprendimiento',
        component: BlogEmprendimientoComponent,
        data: {
            title: 'Emprendimiento en Hostelería | Blog Bite Software',
            description: 'Guías y estrategias de negocio para restaurantes y franquicias.',
            canonical: '/blog-tech/emprendimiento'
        }
    },{ 
        path: 'blog-tech/emprendimiento/:id',
        component: BlogEmprendimientoComponent,
        data: {
            title: 'Emprendimiento en Hostelería | Bite Software',
            description: 'Casos y artículos de emprendimiento hostelero.',
            canonical: '/blog-tech/emprendimiento'
        }

    },
    { 
        path: 'blog-tech/desarrollo',
        component: BlogDesarrolloComponent,
        data: {
            title: 'Desarrollo | Blog Bite Software',
            description: 'Desarrollo de software y buenas prácticas para el sector hostelero.',
            canonical: '/blog-tech/desarrollo'
        }
    },
    {
        path: 'politica-privacidad',
        component: PoliticaPrivacidadComponent,
        data: {
            title: 'Política de Privacidad | Bite Software',
            description: 'Política de privacidad y tratamiento de datos de Bite Software.',
            canonical: '/politica-privacidad'
        }
    },
    {
        path: 'nuestros-servicios',
        component: ComercialServicesComponent,
        data: {
            title: 'Servicios Comerciales | Bite Software',
            description: 'Soluciones comerciales para la digitalización de restaurantes y hoteles.',
            canonical: '/nuestros-servicios'
        }
    },
    {
        path: 'franchise-services',
        component: FranchiseServicesComponent,
        data: {
            title: 'Servicios para Franquicias | Bite Software',
            description: 'Estrategia y tecnología para expansión de franquicias hosteleras.',
            canonical: '/franchise-services'
        }
    },
    {
        path: 'comercial-services',
        component: MarketingServicesComponent,
        data: {
            title: 'Marketing Hostelero Profesional | Bite Software',
            description: 'Redes sociales, fotografía gastronómica, campañas publicitarias y branding para restaurantes.',
            canonical: '/comercial-services'
        }
    },
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        data: {
            title: 'Bite Software | Automatización y Digitalización para Hostelería',
            description: 'Re-evolución digital para restaurantes y hoteles: Fudï y BiteMuch.',
            canonical: '/'
        }
    }
    
   
];
