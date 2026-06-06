import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Game, GroupedGames } from '../models/game'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class GamesService {
    protected _groupedGames: WritableSignal<GroupedGames[]> = signal<GroupedGames[]>([])
    protected _http: HttpClient = inject(HttpClient)

    public readonly games = computed(() => this._groupedGames())

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
}
