import { Component, Input } from '@angular/core'
import { Player } from '../../models/player'

@Component({
    selector: 'app-player-selected-item',
    imports: [],
    templateUrl: './player-selected-item.html',
    styleUrl: './player-selected-item.css',
})

export class PlayerSelectedItem {
    @Input() player!: Player

    public get image(): string {
        return `/assets/img/${this.player.image}`
    }
}
