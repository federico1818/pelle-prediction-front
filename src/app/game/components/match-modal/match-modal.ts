import { Component, inject, OnInit, viewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalFooter } from '../../../shared/components/modal-footer/modal-footer'
import { MatchModalService } from '../../services/match-modal-service'
import { Game } from '../../models/game'
import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary'
import { TeamFlagComponent } from '../team-flag/team-flag'
import { GamesService } from '../../services/games-service'
import { MatchScoreComponent } from '../match-score/match-score'
import { Loading } from '../../../shared/components/loading/loading'

@Component({
    selector: 'app-match-modal',
    imports: [
        Modal,
        ModalContent,
        ModalFooter,
        ButtonPrimary,
        TeamFlagComponent,
        MatchScoreComponent,
        Loading,
    ],
    templateUrl: './match-modal.html',
    styleUrl: './match-modal.scss',
})

export class MatchModalComponent implements OnInit {
    public modal = viewChild(Modal)

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
            this.modal()?.open()

            this._gamesService.predictions(game.id).subscribe({
                next: (res) => {
                    console.log('Predicciones del partido:', res)
                },
                error: (err) => {
                    console.error('Error al obtener predicciones:', err)
                }
            })
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
