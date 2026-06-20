import { Routes } from '@angular/router'
import { authGuard } from './auth/auth-guard'
import { inject } from '@angular/core'
import { AuthService } from './shared/services/auth-service'

export const routes: Routes = [
    {
        path: '',
        redirectTo: () => {
            const authService = inject(AuthService)
            return authService.isAuthenticated() ? 'game' : 'auth/login'
        },
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
        loadComponent: () => import('./scenes/pages/intro/intro').then(m => m.Intro),
        canActivate: [authGuard],
    }
];
