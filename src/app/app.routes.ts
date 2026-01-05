import { Routes } from '@angular/router'
import { Players } from './players/pages/players/players';

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
        path: 'players',
        component: Players,
    },
];
