import { Component, inject, signal, ViewChild, WritableSignal } from '@angular/core'
import { Alert } from '../alert/alert'
import { ErrorService } from '../../services/error-service'
import { ErrorMessage } from '../../models/error-message'
import { AlertTitle } from '../alert-title/alert-title'
import { AlertMessage } from '../alert-message/alert-message'
import { AlertImage } from '../alert-image/alert-image'
import { ButtonPrimary } from '../button-primary/button-primary'

@Component({
    selector: 'app-error-alert',
    imports: [
        Alert,
        AlertTitle,
        AlertMessage,
        AlertImage,
        ButtonPrimary
    ],
    templateUrl: './error-alert.html',
    styleUrl: './error-alert.css',
})

export class ErrorAlert {
    @ViewChild(Alert) alert!: Alert
    private _errorService = inject(ErrorService)

    public title: WritableSignal<string> = signal('')
    public text: WritableSignal<string> = signal('')

    public ngOnInit(): void {
        this._errorService.error$.subscribe((error: ErrorMessage) => {
            this.title.set(error.title)
            this.text.set(error.text)
            this.alert.open()
        })
    }

    public close(): void {
        this.alert.close()
    }
}
