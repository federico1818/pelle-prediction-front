import { Component, input, inject } from '@angular/core'
import { Game } from '../../models/game'
import { TeamFlagComponent } from '../team-flag/team-flag'
import { MatchTimeStatusComponent } from '../match-time-status/match-time-status'
import { MatchModalService } from '../../services/match-modal-service'
import { MatchModalEditService } from '../../services/match-modal-edit-service'
import { MatchPredictionBox } from '../match-prediction-box/match-prediction-box'

@Component({
    selector: 'app-match-with-status',
    imports: [
        TeamFlagComponent,
        MatchTimeStatusComponent,
        MatchPredictionBox
    ],
    templateUrl: './match-with-status.html',
    styleUrl: './match-with-status.css',
    host: {
        'class': 'match',
        '(click)': 'openModal()',
    },
})
export class MatchWithStatusComponent {
    public game = input.required<Game>()

    private _matchModalService = inject(MatchModalService)
    private _matchModalEditService = inject(MatchModalEditService)

    public openModal(): void {
        if (this.game().can_edit) {
            this._matchModalEditService.open(this.game())
        } else {
            this._matchModalService.open(this.game())
        }
    }

    public hasPrediction(): boolean {
        return this.game().prediction_score_1 !== null && this.game().prediction_score_2 !== null
    }
}
