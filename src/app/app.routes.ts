import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) 
    },
    { 
        path: 'create-product',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/create-product/create-product.component').then(m => m.CreateProductComponent) 
    },
    { 
        path: 'create-product/:id',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/create-product/create-product.component').then(m => m.CreateProductComponent) 
    },
    { 
        path: 'cart',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/cart/cart.component').then(m => m.CartComponent) 
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
