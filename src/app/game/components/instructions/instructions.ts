import { Component, inject, ViewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'
import { ModalService } from '../../../shared/services/modal-service'
import { Dialogue } from '../../../shared/components/dialogue/dialogue'


@Component({
    selector: 'app-instructions',
    imports: [
        Modal,
        ModalTitle,
        ModalContent,
        Dialogue
    ],
    templateUrl: './instructions.html',
    styleUrl: './instructions.css',
})

export class Instructions {
    @ViewChild(Modal) modal!: Modal;
    protected _modalService: ModalService = inject(ModalService)

    public ngOnInit(): void {
        this._modalService.open$.subscribe(() => {
            this.modal.open()
        })
    }
}
