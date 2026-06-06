import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Game } from '../models/game'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class GamesService {
    protected _allGames: WritableSignal<Game[]> = signal<Game[]>([])
    protected _http: HttpClient = inject(HttpClient)

    public readonly games = computed(() => this._allGames())

    public all(): Observable<Game[]> {
        return this._http.get<Game[]>(environment.api.url + '/games').pipe(
            tap((games: Game[]) => {
                this._allGames.set(games)
            })
        )
    }

    public predict(gameId: number, score1: number, score2: number): Observable<any> {
        return this._http.post<any>(environment.api.url + `/games/${gameId}/predict`, {
            prediction_score_1: score1,
            prediction_score_2: score2
        }).pipe(
            tap(() => {
                this._allGames.update((games) =>
                    games.map((g) => {
                        if (g.id === gameId) {
                            return {
                                ...g,
                                prediction_score_1: score1,
                                prediction_score_2: score2
                            }
                        }
                        return g
                    })
                )
            })
        )
    }
}
