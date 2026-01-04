import { Component, InputSignal, input } from '@angular/core'
import { GoogleLogo } from '../google-logo/google-logo'

@Component({
    selector: 'app-google-url',
    imports: [
        GoogleLogo
    ],
    templateUrl: './google-url.html',
    styleUrl: './google-url.css',
})

export class GoogleUrl {
    public url: InputSignal<string | null> = input<string | null>(null)
}
