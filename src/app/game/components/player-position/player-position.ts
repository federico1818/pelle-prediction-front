import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-player-position',
    imports: [],
    templateUrl: './player-position.html',
    styleUrl: './player-position.css',
})

export class PlayerPosition {
    @Input() position!: string;
}
