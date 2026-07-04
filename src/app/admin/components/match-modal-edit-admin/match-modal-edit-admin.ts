import { Component, inject, OnInit, viewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalFooter } from '../../../shared/components/modal-footer/modal-footer'
import { MatchModalEditAdminService } from '../../services/match-modal-edit-admin-service'
import { Game } from '../../../game/models/game'
import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary'
import { TeamFlagComponent } from '../../../game/components/team-flag/team-flag'
import { GamesService } from '../../../game/services/games-service'
import { MatchScoreInputComponent } from '../../../game/components/match-score-input/match-score-input'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'

@Component({
    selector: 'app-match-modal-edit-admin',
    imports: [
        Modal,
        ModalTitle,
        ModalContent,
        ModalFooter,
        ButtonPrimary,
        TeamFlagComponent,
        MatchScoreInputComponent
    ],
    templateUrl: './match-modal-edit-admin.html',
    styleUrl: './match-modal-edit-admin.scss',
})
export class MatchModalEditAdminComponent implements OnInit {
    public modal = viewChild(Modal)

    public game: Game | null = null
    public score1: number | null = null
    public score2: number | null = null

    private _matchModalEditAdminService = inject(MatchModalEditAdminService)
    private _gamesService = inject(GamesService)

    public ngOnInit(): void {
        this._matchModalEditAdminService.open$.subscribe((game) => {
            this.game = game
            this.score1 = game.score_1
            this.score2 = game.score_2
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
        this._gamesService.update(game.id, this.score1!, this.score2!).subscribe({
            next: () => {
                this.modal()?.close()
            },
            error: (err) => {
                console.error('Error al guardar el resultado oficial del partido', err)
            }
        })
    }
}
