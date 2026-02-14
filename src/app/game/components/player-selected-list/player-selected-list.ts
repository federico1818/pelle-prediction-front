import { Component, inject, OnInit, signal, Signal } from '@angular/core'
import { Player } from '../../models/player'
import { PlayerSelectedCount } from '../player-selected-count/player-selected-count'
import { PlayerSelectedPositionList } from '../player-selected-position-list/player-selected-position-list'
import { PlayerSelectedService } from '../../services/player-selected-service'

@Component({
    selector: 'app-player-selected-list',
    imports: [
        PlayerSelectedCount,
        PlayerSelectedPositionList
    ],
    templateUrl: './player-selected-list.html',
    styleUrl: './player-selected-list.css',
    host: {
        '[class.expanded]': 'expanded()'
    }
})

export class PlayerSelectedList implements OnInit {
    private _playerSelectedService: PlayerSelectedService = inject(PlayerSelectedService)

    public gk!: Signal<Player[]>
    public def!: Signal<Player[]>
    public mid!: Signal<Player[]>
    public fwd!: Signal<Player[]>

    public expanded = signal(false);

    toggleExpanded() {
        this.expanded.set(!this.expanded());
    }

    ngOnInit(): void {
        this.gk = this._playerSelectedService.gk
        this.def = this._playerSelectedService.def
        this.mid = this._playerSelectedService.mid
        this.fwd = this._playerSelectedService.fwd
    }
}
