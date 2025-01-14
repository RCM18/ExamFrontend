import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CocheComponent } from './nota/nota.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title:'home'
    },
    {
        path:'coche',
        component:CocheComponent,
        title:'coche'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }


];
