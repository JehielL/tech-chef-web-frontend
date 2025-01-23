import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogTechComponent } from './blog-tech/blog-tech.component';
import { BlogEmprendimientoComponent } from './blog-emprendimiento/blog-emprendimiento.component';
import { BlogDesarrolloComponent } from './blog-desarrollo/blog-desarrollo.component';

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
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    }
   
];
