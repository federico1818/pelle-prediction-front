import { Component, inject, signal, WritableSignal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PlayerService } from '../../services/player-service'

@Component({
    selector: 'app-player-search',
    imports: [FormsModule],
    templateUrl: './player-search.html',
    styleUrl: './player-search.css',
})

export class PlayerSearch {
    protected _playerService: PlayerService = inject(PlayerService)
    public query: WritableSignal<string> = signal<string>('')

    public search(query: string): void {
        this.query.set(query.trim().toLowerCase())
        this._playerService.search(this.query())
    }
}
