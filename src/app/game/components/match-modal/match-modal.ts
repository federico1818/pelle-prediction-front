import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalFooter } from '../../../shared/components/modal-footer/modal-footer'
import { MatchModalService } from '../../services/match-modal-service'
import { Game } from '../../models/game'
import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary'
import { TeamFlagComponent } from '../team-flag/team-flag'
import { GamesService } from '../../services/games-service'
import { DatePipe } from '@angular/common'
import { MatchScoreInputComponent } from '../match-score-input/match-score-input'

@Component({
    selector: 'app-match-modal',
    imports: [
        Modal,
        ModalTitle,
        ModalContent,
        ModalFooter,
        ButtonPrimary,
        TeamFlagComponent,
        DatePipe,
        MatchScoreInputComponent
    ],
    templateUrl: './match-modal.html',
    styleUrl: './match-modal.scss',
})
export class MatchModalComponent implements OnInit {
    @ViewChild(Modal) modal!: Modal

    public game: Game | null = null
    public score1: number | null = null
    public score2: number | null = null

    private _matchModalService = inject(MatchModalService)
    private _gamesService = inject(GamesService)

    public ngOnInit(): void {
        this._matchModalService.open$.subscribe((game) => {
            this.game = game
            this.score1 = game.prediction_score_1
            this.score2 = game.prediction_score_2
            this.modal.open()
        })
    }

    public submitResult(): void {
        if (this.game) {
            const finalScore1 = this.score1 ?? 0;
            const finalScore2 = this.score2 ?? 0;

            this._gamesService.predict(this.game.id, finalScore1, finalScore2).subscribe({
                next: (res) => {
                    setTimeout(() => {
                        this.modal.close()
                    }, 0)
                },
                error: (err) => {
                    console.error('Error al guardar la predicción', err)
                }
            })
        }
    }
}
