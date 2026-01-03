import { Component, input, InputSignal } from '@angular/core'

@Component({
    selector: 'app-google-logo',
    imports: [],
    templateUrl: './google-logo.html',
    styleUrl: './google-logo.css',
})

export class GoogleLogo {
    public url: InputSignal<string | null> = input<string | null>(null)
}
