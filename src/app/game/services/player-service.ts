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
    protected _allPlayers: WritableSignal<Player[]> = signal([])
    protected _query: WritableSignal<string> = signal<string>('')
    protected _http: HttpClient = inject(HttpClient)

    public readonly players = computed(() => {
        const query = this._query().toLowerCase().trim()
        if (!query)
            return this._allPlayers()

        return this._allPlayers().filter(player => {
            return player.name.toLowerCase().includes(query) ||
                player.lastname.toLowerCase().includes(query)
        })
    })

    public search(query: string): void {
        this._query.set(query)
    }

    public all(): Observable<Player[]> {
        return this._http.get<Player[]>(environment.api.url + '/players').pipe(
            map((players: Player[]) => players.map((p: Player) => ({
                ...p,
                status: PlayerStatus.NOT_SELECTED,
            }))),
            tap((players: Player[]) => {
                this._allPlayers.set(players)
            })
        )
    }
}
