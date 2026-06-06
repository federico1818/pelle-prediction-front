import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalFooter } from '../../../shared/components/modal-footer/modal-footer'
import { MatchModalService } from '../../services/match-modal-service'
import { Game } from '../../models/game'

@Component({
    selector: 'app-match-modal',
    imports: [
        Modal,
        ModalTitle,
        ModalContent,
        ModalFooter
    ],
    templateUrl: './match-modal.html',
    styleUrl: './match-modal.css',
})
export class MatchModalComponent implements OnInit {
    @ViewChild(Modal) modal!: Modal

    public game: Game | null = null

    private _matchModalService = inject(MatchModalService)

    public ngOnInit(): void {
        this._matchModalService.open$.subscribe((game) => {
            this.game = game
            this.modal.open()
        })
    }
}
