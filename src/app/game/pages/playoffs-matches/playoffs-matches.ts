import { Component, inject } from '@angular/core'
import { GamesService } from '../../services/games-service'
import { MatchListComponent } from '../../components/match-list/match-list'

@Component({
    selector: 'app-playoffs-matches',
    imports: [MatchListComponent],
    templateUrl: './playoffs-matches.html',
    styleUrl: './playoffs-matches.css',
})

export class PlayoffsMatches {
    private _gamesService = inject(GamesService)
    public filteredGames = this._gamesService.selectedPhaseGames
}
