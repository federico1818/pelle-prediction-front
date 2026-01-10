import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Player } from '../../models/player'
import { PlayerItem } from '../player-item/player-item';

@Component({
    selector: 'app-player-list',
    imports: [CommonModule, PlayerItem],
    templateUrl: './player-list.html',
    styleUrl: './player-list.css',
})

export class PlayerList {
    public players: Player[] = [
        {
            id: 1,
            name: 'Player 1',
            position: 'del'
        },
        {
            id: 2,
            name: 'Player 2',
            position: 'mid'
        },
        {
            id: 3,
            name: 'Player 3',
            position: 'mid'
        },
    ];
}
