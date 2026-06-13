import { Routes } from '@angular/router'
import { Champion } from './pages/champion/champion'
import { Ranking } from './pages/ranking/ranking'
import { Matches } from './pages/matches/matches'
import { Game } from './pages/game/game';

export const gameRoutes: Routes = [
    {
        path: '',
        component: Game,
        children: [
            { path: '', redirectTo: 'champion', pathMatch: 'full' },
            { path: 'champion', component: Champion },
            { path: 'ranking', component: Ranking },
            {
                path: 'matches',
                component: Matches,
                children: [
                    { path: '', redirectTo: 'fixture', pathMatch: 'full' },
                    {
                        path: 'group',
                        loadComponent: () => import(
                            './pages/groups/groups'
                        ).then(m => m.Groups),
                        children: [
                            { path: '', redirectTo: 'a', pathMatch: 'full' },
                            {
                                path: ':group',
                                loadComponent: () => import(
                                    './pages/group-matches/group-matches'
                                ).then(m => m.GroupMatchesComponent)
                            }
                        ]
                    },
                    {
                        path: 'fixture',
                        loadComponent: () => import(
                            './pages/fixture/fixture'
                        ).then(m => m.Fixture)
                    }
                ]
            },
        ],
    },
];