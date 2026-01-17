import { Routes } from '@angular/router'

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(c => c.Login),
    },
    {
        path: 'callback',
        loadComponent: () => import('./pages/callback/callback').then(c => c.Callback),
    }
];