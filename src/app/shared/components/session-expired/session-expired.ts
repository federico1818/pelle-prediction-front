import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { Alert } from '../alert/alert'
import { AlertImage } from '../alert-image/alert-image'
import { AlertTitle } from '../alert-title/alert-title'
import { AlertMessage } from '../alert-message/alert-message'
import { ButtonLink } from '../button-link/button-link'
import { AuthService } from '../../services/auth-service'

@Component({
    selector: 'app-session-expired',
    imports: [
        Alert,
        AlertImage,
        AlertTitle,
        AlertMessage,
        ButtonLink
    ],
    templateUrl: './session-expired.html',
    styleUrl: './session-expired.css',
})

export class SessionExpired implements OnInit {
    @ViewChild(Alert) alert!: Alert
    private _authService: AuthService = inject(AuthService)

    public ngOnInit(): void {
        this._authService.sessionExpired$.subscribe(() => {
            this.alert.open()
        })
    }
}
