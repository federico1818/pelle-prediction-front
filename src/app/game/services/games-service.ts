import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router'
import { Observable } from 'rxjs'
import { tap, filter, map, startWith } from 'rxjs/operators'
import { toSignal } from '@angular/core/rxjs-interop'
import { Game, GroupedGames, isGameUpcomingOrPlaying, isGameFinished } from '../models/game'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class GamesService {
    protected _groupedGames: WritableSignal<GroupedGames[]> = signal<GroupedGames[]>([])
    protected _http: HttpClient = inject(HttpClient)
    private _router = inject(Router)

    public readonly games = computed(() => this._groupedGames())

    public readonly currentUrl = toSignal(
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => (event as NavigationEnd).urlAfterRedirects),
            startWith(this._router.url)
        ),
        { initialValue: '' }
    )

    protected readonly selectedGroupLetter = computed(() => {
        const url = this.currentUrl()
        const parts = url.split('/')
        const lastPart = parts[parts.length - 1]?.toUpperCase()
        return lastPart || 'A'
    })

    public readonly selectedGroupData = computed(() => {
        const letter = this.selectedGroupLetter()
        const allGroups = this.games()
        return allGroups.find(g => g.group.name === letter) || null
    })

    public getByDate(month: number, day: number): Game[] {
        return this.games()
            .flatMap(g => g.matches)
            .filter(game => {
                const date = new Date(game.date_time)
                return (date.getMonth() + 1) === month && date.getDate() === day
            })
            .sort((a, b) => {
                return new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
            })
    }

    public all(): Observable<GroupedGames[]> {
        return this._http.get<GroupedGames[]>(environment.api.url + '/games').pipe(
            tap((groups: GroupedGames[]) => {
                this._groupedGames.set(groups)
            })
        )
    }

    public predict(gameId: number, score1: number, score2: number): Observable<any> {
        return this._http.post<any>(environment.api.url + `/games/${gameId}/predict`, {
            prediction_score_1: score1,
            prediction_score_2: score2
        }).pipe(
            tap((res) => {
                const updatedGame = res.game
                this._groupedGames.update((groups) =>
                    groups.map((group) => ({
                        ...group,
                        matches: group.matches.map((g) => (g.id === updatedGame.id ? updatedGame : g))
                    }))
                )
            })
        )
    }

    public predictions(gameId: number): Observable<any> {
        return this._http.get<any>(environment.api.url + `/games/${gameId}/predictions`)
    }

    public readonly upcoming = computed(() => {
        const allMatches = this.games().flatMap(g => g.matches)

        const finished = allMatches
            .filter(game => isGameFinished(game))
            .sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime())
            .slice(0, 1)

        const upcomingAndPlaying = allMatches
            .filter(game => isGameUpcomingOrPlaying(game))
            .sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime())
            .slice(0, 2)

        return [...finished, ...upcomingAndPlaying].sort((a, b) => {
            return new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
        })
    })
}
