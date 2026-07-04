import { Component, inject, OnInit, signal } from '@angular/core'
import { GamesService } from '../../../game/services/games-service'
import { MatchAdminItemComponent } from '../match-admin-item/match-admin-item'
import { MatchModalEditAdminComponent } from '../match-modal-edit-admin/match-modal-edit-admin'
import { Loading } from '../../../shared/components/loading/loading'

@Component({
    selector: 'app-match-list-unfinished',
    imports: [MatchAdminItemComponent, MatchModalEditAdminComponent, Loading],
    templateUrl: './match-list-unfinished.html',
    styleUrl: './match-list-unfinished.css',
})
export class MatchListUnfinished implements OnInit {
    private _gamesService = inject(GamesService)
    public games = this._gamesService.unfinishedGames
    public isLoading = signal(true)

    public ngOnInit(): void {
        this._gamesService.getUnfinished().subscribe({
            next: () => this.isLoading.set(false),
            error: () => this.isLoading.set(false)
        })
    }
}
