import { Component, Input } from '@angular/core'
import { Player } from '../../models/player'
import { PlayerImage } from '../player-image/player-image'
import { PlayerName } from '../player-name/player-name'
import { PlayerPosition } from '../player-position/player-position'

@Component({
    selector: 'app-player-item',
    imports: [
        PlayerImage,
        PlayerName,
        PlayerPosition
    ],
    templateUrl: './player-item.html',
    styleUrl: './player-item.css',
})

export class PlayerItem {
    @Input() player!: Player

    public toggleSelection() {
        this.player.selected = !this.player.selected
    }
}
