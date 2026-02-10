import { Component, InputSignal, input } from '@angular/core'

@Component({
    selector: 'app-google-url',
    imports: [],
    templateUrl: './google-url.html',
    styleUrl: './google-url.css',
})

export class GoogleUrl {
    public url: InputSignal<string | null> = input<string | null>(null)
}
