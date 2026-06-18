import { Component, input, inject, OnInit, OnDestroy, signal } from '@angular/core'
import { Game, isGamePlaying, isGameFinished, getGameTimeRemainingString } from '../../models/game'
import { TeamFlagComponent } from '../team-flag/team-flag'
import { MatchModalService } from '../../services/match-modal-service'
import { MatchModalEditService } from '../../services/match-modal-edit-service'

@Component({
    selector: 'app-match-with-status',
    imports: [TeamFlagComponent],
    templateUrl: './match-with-status.html',
    styleUrl: '../match/match.css',
    host: {
        '(click)': 'openModal()',
    },
})
export class MatchWithStatusComponent implements OnInit, OnDestroy {
    public game = input.required<Game>()

    private _matchModalService = inject(MatchModalService)
    private _matchModalEditService = inject(MatchModalEditService)
    private _intervalId: any

    public countdown = signal<string>('')

    public ngOnInit(): void {
        this.updateCountdown()
        if (!isGamePlaying(this.game()) && !isGameFinished(this.game())) {
            this._intervalId = setInterval(() => {
                this.updateCountdown()
            }, 1000)
        }
    }

    private updateCountdown(): void {
        if (isGamePlaying(this.game())) {
            this.countdown.set('En juego')
            if (this._intervalId) {
                clearInterval(this._intervalId)
                this._intervalId = null
            }
            return
        }
        if (isGameFinished(this.game())) {
            this.countdown.set('Finalizado')
            if (this._intervalId) {
                clearInterval(this._intervalId)
                this._intervalId = null
            }
            return
        }
        this.countdown.set(getGameTimeRemainingString(this.game()))
    }

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

    public ngOnDestroy(): void {
        if (this._intervalId) {
            clearInterval(this._intervalId)
        }
    }
}
