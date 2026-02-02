import { Injectable, signal, WritableSignal, inject, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Player } from '../models/player'
import { environment } from '../../../environments/environment'
import { PlayerStatus } from '../models/player-status'

@Injectable({
    providedIn: 'root',
})

export class PlayerService {
    protected _max: WritableSignal<number> = signal(0)
    protected _allPlayers: WritableSignal<Player[]> = signal([])
    protected _query: WritableSignal<string> = signal<string>('')
    protected _http: HttpClient = inject(HttpClient)

    public readonly max = computed(() => this._max())

    public readonly players = computed(() => {
        const query = this._query().toLowerCase().trim()
        if (!query)
            return this._allPlayers()

        return this._allPlayers().filter(player => {
            return player.name.toLowerCase().includes(query) ||
                player.lastname.toLowerCase().includes(query)
        })
    })

    public readonly selected = computed(() => {
        return this._allPlayers().filter(player => {
            return player.status === PlayerStatus.SELECTED
        })
    })

    public search(query: string): void {
        this._query.set(query)
    }

    public all(): Observable<Player[]> {
        return this._http.get<Player[]>(environment.api.url + '/players').pipe(
            tap((players: Player[]) => {
                this._allPlayers.set(players)
            })
        )
    }

    public select(player: Player): Observable<Player> {
        return this._http.post<Player>(
            environment.api.url + '/players/select/' + player.id,
            null
        ).pipe(
            tap((player: Player) => {
                this._allPlayers.update((players) =>
                    players.map((p) => (p.id === player.id ? player : p))
                )
            })
        )
    }

    public remove(player: Player): Observable<Player> {
        return this._http.post<Player>(
            environment.api.url + '/players/remove/' + player.id,
            null
        ).pipe(
            tap((player: Player) => {
                this._allPlayers.update((players) =>
                    players.map((p) => (p.id === player.id ? player : p))
                )
            })
        )
    }

    public getMax(): Observable<number> {
        return this._http.get<number>(environment.api.url + '/players/max').pipe(
            tap((max: number) => {
                this._max.set(max)
            })
        )
    }
}
