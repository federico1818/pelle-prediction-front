import { Component, inject, OnInit, Signal, signal } from '@angular/core'
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
    protected _playerService: PlayerService = inject(PlayerService);
    protected players: Signal<Player[]> = signal([]);

    ngOnInit(): void {
        this.players = this._playerService.players
        this._playerService.all().subscribe()
    }
}
