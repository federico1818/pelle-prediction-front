import { Routes } from '@angular/router'
import { List } from './pages/list/list'
import { Ranking } from './pages/ranking/ranking'
import { Necks } from './pages/necks/necks'
import { Game } from './pages/game/game';

export const gameRoutes: Routes = [
    {
        path: '',
        component: Game,
        children: [
            { path: '', redirectTo: 'ranking', pathMatch: 'full' },
            { path: 'list', component: List },
            { path: 'ranking', component: Ranking },
            { path: 'necks', component: Necks },
        ],
    },
];