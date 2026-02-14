import { Injectable, computed, inject } from '@angular/core'
import { PlayerService } from './player-service'

@Injectable({
    providedIn: 'root',
})

export class PlayerSelectedService {
    protected _playerService: PlayerService = inject(PlayerService)

    public readonly gk = computed(() => {
        return this._playerService.selected().filter(player => player.position === 'gk')
    })

    public readonly def = computed(() => {
        return this._playerService.selected().filter(player => player.position === 'def')
    })

    public readonly mid = computed(() => {
        return this._playerService.selected().filter(player => player.position === 'mid')
    })

    public readonly fwd = computed(() => {
        return this._playerService.selected().filter(player => player.position === 'fwd')
    })
}
