import { Routes } from '@angular/router'
import { Champion } from './pages/champion/champion'
import { Ranking } from './pages/ranking/ranking'
import { Necks } from './pages/necks/necks'
import { Game } from './pages/game/game';

export const gameRoutes: Routes = [
    {
        path: '',
        component: Game,
        children: [
            { path: '', redirectTo: 'ranking', pathMatch: 'full' },
            { path: 'champion', component: Champion },
            { path: 'ranking', component: Ranking },
            { path: 'necks', component: Necks },
        ],
    },
];