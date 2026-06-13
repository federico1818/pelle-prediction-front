import { Component, inject, Signal, computed } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { GamesService } from '../../services/games-service'
import { GroupedGames } from '../../models/game'
import { GroupListComponent } from '../../components/group-list/group-list'

@Component({
    selector: 'app-groups',
    imports: [RouterOutlet, GroupListComponent],
    templateUrl: './groups.html',
    styleUrl: './groups.css',
})

export class Groups {
    private _gamesService: GamesService = inject(GamesService)
    public games: Signal<GroupedGames[]> = this._gamesService.games

    public groups = computed(() => this.games().map(g => g.group))
}
