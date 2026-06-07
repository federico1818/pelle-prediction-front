import { Component, Input } from '@angular/core'
import { GroupedGames } from '../../models/game'
import { GroupNameComponent } from '../group-name/group-name'
import { MatchListComponent } from '../match-list/match-list'
import { PositionTableComponent } from '../position-table/position-table'

@Component({
    selector: 'app-group-item',
    imports: [
        GroupNameComponent,
        MatchListComponent,
        PositionTableComponent
    ],
    templateUrl: './group-item.html',
    styleUrl: './group-item.css',
})

export class GroupItemComponent {
    @Input({ required: true }) group!: GroupedGames
}
