import { Component, Input, inject } from '@angular/core'
import { Game } from '../../models/game'
import { DatePipe } from '@angular/common'
import { TeamFlagComponent } from '../team-flag/team-flag'
import { MatchModalService } from '../../services/match-modal-service'

@Component({
    selector: 'app-match',
    imports: [DatePipe, TeamFlagComponent],
    templateUrl: './match.html',
    styleUrl: './match.css',
    host: {
        '(click)': 'openModal()',
    },
})
export class MatchComponent {
    @Input({ required: true }) game!: Game

    private _matchModalService = inject(MatchModalService)

    public openModal(): void {
        this._matchModalService.open(this.game)
    }

    public hasPrediction(): boolean {
        return this.game.prediction_score_1 !== null && this.game.prediction_score_2 !== null
    }
}
