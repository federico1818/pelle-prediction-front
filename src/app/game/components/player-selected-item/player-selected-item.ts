import { Component, inject, Input } from '@angular/core'
import { Player } from '../../models/player'
import { PlayerService } from '../../services/player-service'
import { ButtonIcon } from '../../../shared/components/button-icon/button-icon'

@Component({
    selector: 'app-player-selected-item',
    imports: [
        ButtonIcon
    ],
    templateUrl: './player-selected-item.html',
    styleUrl: './player-selected-item.css',
})

export class PlayerSelectedItem {
    @Input() player!: Player
    private _playerService: PlayerService = inject(PlayerService)

    public get image(): string {
        return `/assets/img/${this.player.image}`
    }

    public remove(): void {
        this._playerService.remove(this.player).subscribe()
    }
}
