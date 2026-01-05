import { Routes } from '@angular/router'
import { List } from './game/pages/list/list'

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
        path: 'list',
        component: List,
    },
];
