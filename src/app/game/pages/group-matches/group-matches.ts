import { Component, inject } from '@angular/core'
import { GamesService } from '../../services/games-service'
import { GroupItemComponent } from '../../components/group-item/group-item'

@Component({
    selector: 'app-group-matches',
    imports: [GroupItemComponent],
    templateUrl: './group-matches.html',
    styleUrl: './group-matches.css',
})

export class GroupMatchesComponent {
    private _gamesService = inject(GamesService)
    public groupData = this._gamesService.selectedGroupData
}
