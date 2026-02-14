import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { Player } from '../../models/player'
import { PlayerSelectedItem } from '../player-selected-item/player-selected-item'

@Component({
    selector: 'app-player-selected-position-list',
    imports: [
        CommonModule,
        PlayerSelectedItem,
    ],
    templateUrl: './player-selected-position-list.html',
    styleUrl: './player-selected-position-list.css',
    host: {
        '[style.display]': 'players().length === 0 ? "none" : null'
    }
})

export class PlayerSelectedPositionList {
    public players = input<Player[]>([])
}
