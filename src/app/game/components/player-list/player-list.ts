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
            lastname: 'Player 1',
            position: 'del',
            image: 'player.webp'
        },
        {
            id: 2,
            name: 'Player 2',
            lastname: 'Player 2',
            position: 'mid',
            image: 'player.webp'
        },
        {
            id: 3,
            name: 'Player 3',
            lastname: 'Player 3',
            position: 'mid',
            image: 'player.webp'
        },
    ];
}
