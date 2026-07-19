import { Component, input } from '@angular/core'

@Component({
    selector: 'app-winner',
    imports: [],
    templateUrl: './winner.html',
    styleUrl: './winner.css',
})

export class Winner {
    public nickname = input.required<string>()
}
