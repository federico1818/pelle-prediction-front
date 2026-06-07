import { Routes } from '@angular/router'
import { Champion } from './pages/champion/champion'
import { List } from './pages/list/list'
import { Ranking } from './pages/ranking/ranking'
import { Necks } from './pages/necks/necks'
import { Matches } from './pages/matches/matches'
import { Game } from './pages/game/game';

export const gameRoutes: Routes = [
    {
        path: '',
        component: Game,
        children: [
            { path: '', redirectTo: 'champion', pathMatch: 'full' },
            { path: 'champion', component: Champion },
            { path: 'list', component: List },
            { path: 'ranking', component: Ranking },
            { path: 'necks', component: Necks },
            {
                path: 'matches',
                component: Matches,
                children: [
                    { path: '', redirectTo: 'a', pathMatch: 'full' },
                    {
                        path: ':group',
                        loadComponent: () => import('./pages/group-matches/group-matches').then(m => m.GroupMatchesComponent)
                    }
                ]
            },
        ],
    },
];