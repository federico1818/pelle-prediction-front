import { Component, inject, ViewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalFooter } from '../../../shared/components/modal-footer/modal-footer'
import { ModalService } from '../../../shared/services/modal-service'
import { Dialogue } from '../../../shared/components/dialogue/dialogue'
import { DialogueService } from '../../../shared/services/dialogue-service'
import { Video } from '../../../shared/components/video/video'


@Component({
    selector: 'app-instructions',
    imports: [
        Modal,
        ModalTitle,
        ModalContent,
        ModalFooter,
        Dialogue,
        Video
    ],
    templateUrl: './instructions.html',
    styleUrl: './instructions.css',
})

export class Instructions {
    @ViewChild(Modal) modal!: Modal
    @ViewChild(Video) video!: Video

    protected _modalService: ModalService = inject(ModalService)
    protected _dialogueService: DialogueService = inject(DialogueService)

    public ngOnInit(): void {
        this._modalService.open$.subscribe(() => {
            this.modal.open()
            this._dialogueService.setText('No trates de entenderlo, disfrutalo.')
            this.video.play()
        })
    }
}
