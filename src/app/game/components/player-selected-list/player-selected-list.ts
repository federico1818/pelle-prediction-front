import { CommonModule } from '@angular/common'
import { Component, inject, OnInit, signal, Signal } from '@angular/core'
import { PlayerService } from '../../services/player-service'
import { Player } from '../../models/player'
import { PlayerSelectedItem } from '../player-selected-item/player-selected-item'
import { PlayerSelectedCount } from '../player-selected-count/player-selected-count'

@Component({
    selector: 'app-player-selected-list',
    imports: [
        CommonModule,
        PlayerSelectedItem,
        PlayerSelectedCount
    ],
    templateUrl: './player-selected-list.html',
    styleUrl: './player-selected-list.css',
    host: {
        '[class.expanded]': 'expanded()'
    }
})

export class PlayerSelectedList implements OnInit {
    private _playerService: PlayerService = inject(PlayerService);
    public players: Signal<Player[]> = signal([]);
    public expanded = signal(false);

    toggleExpanded() {
        this.expanded.set(!this.expanded());
    }

    ngOnInit(): void {
        this.players = this._playerService.selected
        this._playerService.all().subscribe()
    }
}
