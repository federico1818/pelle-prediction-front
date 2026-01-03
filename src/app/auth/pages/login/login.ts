import { Component } from '@angular/core'
import { GoogleLogo } from '../../components/google-logo/google-logo'

@Component({
    selector: 'app-login',
    imports: [
        GoogleLogo
    ],
    templateUrl: './login.html',
    styleUrl: './login.css',
})

export class Login {

}
