import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Game } from '../models/game'

@Injectable({
    providedIn: 'root',
})

export class MatchModalService {
    private _open = new Subject<Game>()
    public open$ = this._open.asObservable()

    public open(game: Game): void {
        this._open.next(game)
    }
}
