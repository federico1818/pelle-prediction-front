import { Component, OnInit, inject, Signal, computed } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { GamesService } from '../../services/games-service'
import { GroupedGames } from '../../models/game'
import { GroupListComponent } from '../../components/group-list/group-list'

@Component({
    selector: 'app-matches',
    imports: [RouterOutlet, GroupListComponent],
    templateUrl: './matches.html',
    styleUrl: './matches.css',
})

export class Matches implements OnInit {
    private _gamesService: GamesService = inject(GamesService)
    public games: Signal<GroupedGames[]> = this._gamesService.games

    public groups = computed(() => this.games().map(g => g.group))

    ngOnInit(): void {
        this._gamesService.all().subscribe()
    }
}
