import { Component, OnInit, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { GamesService } from '../../services/games-service'
import { MatchNav } from '../../components/match-nav/match-nav'

@Component({
    selector: 'app-matches',
    imports: [RouterOutlet, MatchNav],
    templateUrl: './matches.html',
    styleUrl: './matches.css',
})

export class Matches implements OnInit {
    private _gamesService: GamesService = inject(GamesService)

    public ngOnInit(): void {
        this._gamesService.all().subscribe()
    }
}
