import { CommonModule } from '@angular/common'
import { Component, ElementRef, ViewChild } from '@angular/core'

@Component({
    selector: 'app-alert',
    imports: [CommonModule],
    templateUrl: './alert.html',
    styleUrl: './alert.css',
})

export class Alert {
    @ViewChild('dialogRef') dialogElement!: ElementRef<HTMLDialogElement>
    public opened: boolean = false

    public open(): void {
        this.dialogElement.nativeElement.showModal()
        this.opened = true
    }
}
