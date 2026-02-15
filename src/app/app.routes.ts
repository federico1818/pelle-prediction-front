import { Routes } from '@angular/router'
import { authGuard } from './auth/auth-guard'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(r => r.authRoutes),
    },
    {
        path: 'game',
        loadChildren: () => import('./game/game.routes').then(r => r.gameRoutes),
        canActivate: [authGuard],
    },
    {
        path: 'intro',
        loadComponent: () => import('./game/pages/intro/intro').then(m => m.Intro),
    },
];
