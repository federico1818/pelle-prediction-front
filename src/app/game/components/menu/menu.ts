import { Component, inject } from '@angular/core'
import { ModalService } from '../../../shared/services/modal-service'

@Component({
    selector: 'app-menu',
    imports: [],
    templateUrl: './menu.html',
    styleUrl: './menu.css',
})

export class Menu {
    protected _modalService: ModalService = inject(ModalService)

    public openModal(): void {
        this._modalService.open()
    }
}
