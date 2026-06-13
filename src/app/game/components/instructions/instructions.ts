import { Component, inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { Modal } from '../../../shared/components/modal/modal'
import { ModalTitle } from '../../../shared/components/modal-title/modal-title'
import { ModalContent } from '../../../shared/components/modal-content/modal-content'
import { ModalService } from '../../../shared/services/modal-service'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { Scene } from '../../../shared/models/scene'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-instructions',
    imports: [
        Modal,
        ModalTitle,
        ModalContent,
        SceneComponent
    ],
    templateUrl: './instructions.html',
    styleUrl: './instructions.css',
})

export class Instructions implements AfterViewInit, OnDestroy {
    @ViewChild(Modal) modal!: Modal
    @ViewChild(SceneComponent) sceneRef!: SceneComponent

    protected _modalService: ModalService = inject(ModalService)
    private _modalSub?: Subscription

    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: 'No trates de entenderlo, disfrutalo.',
                src: 'instructions.mp4',
                type: 'video'
            }
        ]
    }

    public ngAfterViewInit(): void {
        this._modalSub = this._modalService.open$.subscribe(() => {
            this.modal.open()
            setTimeout(() => {
                this.sceneRef?.play()
            })
        })
    }

    public ngOnDestroy(): void {
        this._modalSub?.unsubscribe()
    }
}