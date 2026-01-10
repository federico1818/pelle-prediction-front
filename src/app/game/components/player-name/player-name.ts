import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-player-name',
    imports: [],
    templateUrl: './player-name.html',
    styleUrl: './player-name.css',
})

export class PlayerName {
    @Input() name!: string
    @Input() lastname!: string
}
