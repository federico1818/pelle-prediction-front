import { CommonModule } from '@angular/common'
import { Component, ElementRef, ViewChild } from '@angular/core'

@Component({
    selector: 'app-modal',
    imports: [CommonModule],
    templateUrl: './modal.html',
    styleUrl: './modal.css',
})

export class Modal {
    @ViewChild('dialogRef') dialogElement!: ElementRef<HTMLDialogElement>
    public opened: boolean = false

    public close(): void {
        this.dialogElement.nativeElement.close()
        this.opened = false
    }

    public open(): void {
        this.dialogElement.nativeElement.showModal()
        this.opened = true
    }
}
