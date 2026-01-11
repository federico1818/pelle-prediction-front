import { Injectable, signal, WritableSignal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Player } from '../models/player'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    public players: WritableSignal<Player[]> = signal([])

    constructor(
        protected http: HttpClient
    ) { }

    public all(): Observable<Player[]> {
        return this.http.get<Player[]>(environment.api.url + '/players').pipe(
            tap((players: Player[]) => {
                this.players.set(players)
            })
        )
    }
}
