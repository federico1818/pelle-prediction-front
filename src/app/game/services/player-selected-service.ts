import { Injectable, computed, inject } from '@angular/core'
import { PlayerService } from './player-service'

@Injectable({
    providedIn: 'root',
})

export class PlayerSelectedService {
    protected _playerService: PlayerService = inject(PlayerService)

    public readonly gk = computed(() => {
        return this._playerService.selected().filter(player => player.position === 'GK')
    })

    public readonly def = computed(() => {
        return this._playerService.selected().filter(player => player.position === 'DEF')
    })

    public readonly mid = computed(() => {
        return this._playerService.selected().filter(player => player.position === 'MID')
    })

    public readonly att = computed(() => {
        return this._playerService.selected().filter(player => player.position === 'ATT')
    })
}
