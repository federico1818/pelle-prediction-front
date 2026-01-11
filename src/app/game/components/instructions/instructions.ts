import { Component, inject, ViewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'
import { ModalService } from '../../../shared/services/modal-service'

@Component({
    selector: 'app-instructions',
    imports: [Modal, ModalTitle],
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
