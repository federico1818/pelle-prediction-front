import { Component, OnInit, signal, WritableSignal } from '@angular/core'
import { GoogleLogo } from '../../components/google-logo/google-logo'
import { GoogleAuthService } from '../../services/google-auth-service'

@Component({
    selector: 'app-login',
    imports: [
        GoogleLogo
    ],
    templateUrl: './login.html',
    styleUrl: './login.css',
})

export class Login implements OnInit {
    public url: WritableSignal<string | null> = signal<string | null>(null)

    constructor(
        private googleAuthService: GoogleAuthService
    ) { }

    ngOnInit(): void {
        this.googleAuthService.getUrl().subscribe((data: { url: string }) => {
            this.url.set(data.url)
        })
    }

}
