import { CommonModule } from '@angular/common'
import { Component, signal, Signal } from '@angular/core'
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
})

export class PlayerSelectedPositionList {
    public players: Signal<Player[]> = signal([])
}
