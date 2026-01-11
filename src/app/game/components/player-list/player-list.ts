import { Component, OnInit, signal, WritableSignal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Player } from '../../models/player'
import { PlayerItem } from '../player-item/player-item';
import { PlayerService } from '../../services/player-service'

@Component({
    selector: 'app-player-list',
    imports: [CommonModule, PlayerItem],
    templateUrl: './player-list.html',
    styleUrl: './player-list.css',
})

export class PlayerList implements OnInit {
    protected players: WritableSignal<Player[]> = signal([]);

    constructor(
        protected playerService: PlayerService
    ) { }

    ngOnInit(): void {
        this.playerService.all().subscribe((players: Player[]) => {
            this.players.set(players)
        })
    }
}
