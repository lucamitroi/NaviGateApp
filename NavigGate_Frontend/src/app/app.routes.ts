import { Routes } from '@angular/router';
import { PreventNavigationGuard } from './auth/prevent-navigation.guard';
import { LoginCheckGuard } from './auth/login-check.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{
    path: 'register',
    pathMatch: 'full',
    loadComponent: async () => {
        return import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
        );
    },
    canActivate: [PreventNavigationGuard]
},
{
    path: 'login',
    loadComponent: async () => {
        return import('./pages/login/login.component').then(
            (m) => m.LoginComponent
        );
    },
    canActivate: [PreventNavigationGuard]
},
{
    path: 'dashboard',
    loadComponent: async () => {
        return import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
        );
    },
    canActivate: [LoginCheckGuard]
},
{ path: '**', component: NotFoundComponent }
];
