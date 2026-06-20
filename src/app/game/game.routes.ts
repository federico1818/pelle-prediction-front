import { Routes } from '@angular/router'
import { Champion } from './pages/champion/champion'
import { Ranking } from './pages/ranking/ranking'
import { Matches } from './pages/matches/matches'
import { Game } from './pages/game/game';
import { Home } from './pages/home/home';
import { Fixture } from './pages/fixture/fixture';

export const gameRoutes: Routes = [
    {
        path: '',
        component: Game,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'champion', component: Champion },
            { path: 'ranking', component: Ranking },
            { path: 'home', component: Home },
            {
                path: 'settings',
                loadComponent: () => import(
                    './pages/settings/settings'
                ).then(m => m.Settings)
            },
            {
                path: 'matches',
                component: Matches,
                children: [
                    { path: '', redirectTo: 'fixture', pathMatch: 'full' },
                    { path: 'fixture', component: Fixture },
                    { path: 'fixture/:month/:day', component: Fixture },
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
                    }
                ]
            },
        ],
    },
];