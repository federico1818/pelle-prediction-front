import { Routes } from '@angular/router'
import { Champion } from './pages/champion/champion'
import { Ranking } from './pages/ranking/ranking'
import { Matches } from './pages/matches/matches'
import { Game } from './pages/game/game'
import { Home } from './pages/home/home'
import { Calendar } from './pages/calendar/calendar'
import { Playoffs } from './pages/playoffs/playoffs'
import { Stats } from './pages/stats/stats'
import { History } from './pages/history/history'

export const gameRoutes: Routes = [
    {
        path: '',
        component: Game,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'champion', component: Champion },
            {
                path: 'stats',
                component: Stats,
                children: [
                    { path: '', redirectTo: 'ranking', pathMatch: 'full' },
                    { path: 'ranking', component: Ranking },
                    { path: 'history', component: History }
                ]
            },
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
                    { path: '', redirectTo: 'calendar', pathMatch: 'full' },
                    {
                        path: 'playoffs',
                        component: Playoffs,
                        children: [
                            { path: '', redirectTo: 'round-4', pathMatch: 'full' },
                            {
                                path: ':phase',
                                loadComponent: () => import(
                                    './pages/playoffs-matches/playoffs-matches'
                                ).then(m => m.PlayoffsMatches)
                            }
                        ]
                    },
                    { path: 'calendar', component: Calendar },
                    { path: 'calendar/:month/:day', component: Calendar },
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