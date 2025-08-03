import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogTechComponent } from './blog-tech/blog-tech.component';
import { BlogEmprendimientoComponent } from './blog-emprendimiento/blog-emprendimiento.component';
import { BlogDesarrolloComponent } from './blog-desarrollo/blog-desarrollo.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { ComercialServicesComponent } from './comercial-services/comercial-services.component';
import { FranchiseServicesComponent } from './franchise-services/franchise-services.component';

export const routes: Routes = [

    {
        path: 'home',
        component: HomeComponent
    }
    ,
    {
        path: 'blog-tech',
        component: BlogTechComponent
    },
    {

        path: 'blog-tech/emprendimiento',
        component: BlogEmprendimientoComponent
    },{ 
        path: 'blog-tech/emprendimiento/:id',
        component: BlogEmprendimientoComponent

    },
    { 
        path: 'blog-tech/desarrollo',
        component: BlogDesarrolloComponent
    },
    {
        path: 'politica-privacidad',
        component: PoliticaPrivacidadComponent
    },
    {
        path: 'nuestros-servicios',
        component: ComercialServicesComponent
    },
    {
        path: 'franchise-services',
        component: FranchiseServicesComponent
    },
    
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    }
    
   
];
