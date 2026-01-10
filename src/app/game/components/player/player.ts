import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Player as PlayerModel } from '../../models/player'
import { PlayerName } from '../player-name/player-name'

@Component({
    selector: 'app-player',
    imports: [CommonModule, PlayerName],
    templateUrl: './player.html',
    styleUrl: './player.css',
})

export class Player {
    @Input() player!: PlayerModel
}
