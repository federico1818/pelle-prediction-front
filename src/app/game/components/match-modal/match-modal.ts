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
import { FormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common'

@Component({
    selector: 'app-match-modal',
    imports: [
        Modal,
        ModalTitle,
        ModalContent,
        ModalFooter,
        ButtonPrimary,
        TeamFlagComponent,
        FormsModule,
        DatePipe
    ],
    templateUrl: './match-modal.html',
    styleUrl: './match-modal.scss',
})
export class MatchModalComponent implements OnInit {
    @ViewChild(Modal) modal!: Modal

    public game: Game | null = null
    public score1: number = 0
    public score2: number = 0

    private _matchModalService = inject(MatchModalService)
    private _gamesService = inject(GamesService)

    public ngOnInit(): void {
        this._matchModalService.open$.subscribe((game) => {
            this.game = game
            this.score1 = game.prediction_score_1 ?? 0
            this.score2 = game.prediction_score_2 ?? 0
            this.modal.open()
        })
    }

    public incrementScore1(): void {
        this.score1++
    }

    public decrementScore1(): void {
        if (this.score1 > 0) {
            this.score1--
        }
    }

    public incrementScore2(): void {
        this.score2++
    }

    public decrementScore2(): void {
        if (this.score2 > 0) {
            this.score2--
        }
    }

    public submitResult(): void {
        if (this.game) {
            this._gamesService.predict(this.game.id, this.score1, this.score2).subscribe({
                next: (res) => {
                    if (this.game) {
                        this.game.prediction_score_1 = this.score1
                        this.game.prediction_score_2 = this.score2
                    }
                    this.modal.close()
                },
                error: (err) => {
                    console.error('Error al guardar la predicción', err)
                }
            })
        }
    }
}
