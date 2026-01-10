import { Component, Input } from '@angular/core'
import { Player } from '../../models/player'
import { PlayerImage } from '../player-image/player-image'
import { PlayerName } from '../player-name/player-name'

@Component({
    selector: 'app-player-item',
    imports: [PlayerImage, PlayerName],
    templateUrl: './player-item.html',
    styleUrl: './player-item.css',
})

export class PlayerItem {
    @Input() player!: Player
}
