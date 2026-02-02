import { Component, computed, inject, OnInit, Signal } from '@angular/core'
import { PlayerService } from '../../services/player-service'

@Component({
    selector: 'app-player-selected-count',
    imports: [],
    templateUrl: './player-selected-count.html',
    styleUrl: './player-selected-count.css',
})

export class PlayerSelectedCount implements OnInit {
    private _playerService: PlayerService = inject(PlayerService)

    public max: Signal<number> = this._playerService.max
    public count: Signal<number> = computed(() => this._playerService.selected().length)

    public ngOnInit(): void {
        this._playerService.getMax().subscribe()
    }
}
