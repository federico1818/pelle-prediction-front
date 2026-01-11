import { Component } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'

@Component({
    selector: 'app-instructions',
    imports: [Modal, ModalTitle],
    templateUrl: './instructions.html',
    styleUrl: './instructions.css',
})

export class Instructions {
    public open: boolean = false
}
