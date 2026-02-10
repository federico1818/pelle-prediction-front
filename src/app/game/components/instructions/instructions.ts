import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalFooter } from '../../../shared/components/modal-footer/modal-footer'
import { ModalService } from '../../../shared/services/modal-service'
import { Dialogue } from '../../../shared/components/dialogue/dialogue'
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

export class Instructions implements OnInit {
    @ViewChild(Modal) modal!: Modal
    @ViewChild(Video) video!: Video
    @ViewChild('dialogueRef') dialogueElement!: Dialogue

    protected _modalService: ModalService = inject(ModalService)

    public ngOnInit(): void {
        this._modalService.open$.subscribe(() => {
            this.modal.open()
            this.dialogueElement.write('No trates de entenderlo, disfrutalo.')
            this.video.play()
        })
    }
}