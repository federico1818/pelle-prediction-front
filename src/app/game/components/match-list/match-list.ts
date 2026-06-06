import { Component, Input } from '@angular/core'
import { GroupedGames } from '../../models/game'
import { MatchComponent } from '../match/match'

@Component({
    selector: 'app-match-list',
    imports: [MatchComponent],
    templateUrl: './match-list.html',
    styleUrl: './match-list.css',
})
export class MatchListComponent {
    @Input({ required: true }) games: GroupedGames[] = []
}
