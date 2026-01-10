import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Player } from '../../models/player'
import { Player as PlayerComponent } from '../player/player'

@Component({
    selector: 'app-player-list',
    imports: [CommonModule, PlayerComponent],
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
