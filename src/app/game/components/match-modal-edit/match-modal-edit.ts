import { Component, inject, OnInit, viewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalFooter } from '../../../shared/components/modal-footer/modal-footer'
import { MatchModalEditService } from '../../services/match-modal-edit-service'
import { Game } from '../../models/game'
import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary'
import { TeamFlagComponent } from '../team-flag/team-flag'
import { GamesService } from '../../services/games-service'
import { MatchScoreInputComponent } from '../match-score-input/match-score-input'

@Component({
    selector: 'app-match-modal-edit',
    imports: [
        Modal,
        ModalContent,
        ModalFooter,
        ButtonPrimary,
        TeamFlagComponent,
        MatchScoreInputComponent
    ],
    templateUrl: './match-modal-edit.html',
    styleUrl: './match-modal-edit.scss',
})

export class MatchModalEditComponent implements OnInit {
    public modal = viewChild(Modal)

    public game: Game | null = null
    public score1: number | null = null
    public score2: number | null = null

    private _matchModalService = inject(MatchModalEditService)
    private _gamesService = inject(GamesService)

    public ngOnInit(): void {
        this._matchModalService.open$.subscribe((game) => {
            this.game = game
            this.score1 = game.prediction_score_1
            this.score2 = game.prediction_score_2
            this.modal()?.open()
        })
    }

    public get isButtonDisabled(): boolean {
        return !this._isValid()
    }

    private _isValid(): boolean {
        return this.score1 !== null && this.score2 !== null
    }

    public submitResult(): void {
        if (!this._isValid()) {
            return
        }

        const game = this.game!
        this._gamesService.predict(game.id, this.score1!, this.score2!).subscribe({
            next: () => {
                this.modal()?.close()
            },
            error: (err) => {
                console.error('Error al guardar la predicción', err)
            }
        })
    }
}
