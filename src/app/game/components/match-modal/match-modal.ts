import { Component, inject, OnInit, viewChild, signal } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalFooter } from '../../../shared/components/modal-footer/modal-footer'
import { MatchModalService } from '../../services/match-modal-service'
import { Game } from '../../models/game'
import { TeamFlagComponent } from '../team-flag/team-flag'
import { GamesService } from '../../services/games-service'
import { MatchScoreComponent } from '../match-score/match-score'
import { Loading } from '../../../shared/components/loading/loading'
import { MatchPredictionList } from '../match-prediction-list/match-prediction-list'
import { Prediction } from '../../models/prediction'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'

@Component({
    selector: 'app-match-modal',
    imports: [
        Modal,
        ModalTitle,
        ModalContent,
        ModalFooter,
        TeamFlagComponent,
        MatchScoreComponent,
        Loading,
        MatchPredictionList,
    ],
    templateUrl: './match-modal.html',
    styleUrl: './match-modal.scss',
})

export class MatchModalComponent implements OnInit {
    public modal = viewChild(Modal)

    public game: Game | null = null
    public predictions = signal<Prediction[]>([])
    public isLoading = signal(false)

    private _matchModalService = inject(MatchModalService)
    private _gamesService = inject(GamesService)

    public ngOnInit(): void {
        this._matchModalService.open$.subscribe((game) => {
            this.game = game
            this.predictions.set([])
            this.isLoading.set(true)
            this.modal()?.open()

            this._gamesService.predictions(game.id).subscribe({
                next: (res) => {
                    this.predictions.set(res)
                    this.isLoading.set(false)
                },
                error: (err) => {
                    console.error('Error al obtener predicciones:', err)
                    this.isLoading.set(false)
                }
            })
        })
    }
}
