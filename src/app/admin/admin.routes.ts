import { Routes } from '@angular/router'

export const adminRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'matches',
    },
    {
        path: 'matches',
        loadComponent: () => import('./pages/matches/matches').then(m => m.Matches),
    },
];
