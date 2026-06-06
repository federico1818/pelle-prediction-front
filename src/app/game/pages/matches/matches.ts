import { Component, OnInit, inject, Signal } from '@angular/core'
import { GamesService } from '../../services/games-service'
import { Game } from '../../models/game'
import { MatchListComponent } from '../../components/match-list/match-list'

@Component({
    selector: 'app-matches',
    imports: [MatchListComponent],
    templateUrl: './matches.html',
    styleUrl: './matches.css',
})

export class Matches implements OnInit {
    private _gamesService: GamesService = inject(GamesService)
    public games: Signal<Game[]> = this._gamesService.games

    ngOnInit(): void {
        this._gamesService.all().subscribe()
    }
}
