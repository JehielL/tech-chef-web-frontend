import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogTechComponent } from './blog-tech/blog-tech.component';

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
        path: '',
        component: HomeComponent
    }
];
