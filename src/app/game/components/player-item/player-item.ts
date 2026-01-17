import { Component, Input } from '@angular/core'
import { Player } from '../../models/player'
import { PlayerImage } from '../player-image/player-image'
import { PlayerName } from '../player-name/player-name'
import { PlayerPosition } from '../player-position/player-position'
import { PlayerStatus } from '../../models/player-status'

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

    public select() {
        if (this.player.status === PlayerStatus.NOT_SELECTED) {
            this.adding()
        }
    }

    private adding(): void {
        this.player.status = PlayerStatus.ADDING
    }
}
