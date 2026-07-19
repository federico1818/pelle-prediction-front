import { Component, input } from '@angular/core'
import { UserHistoryItem } from '../../models/user-history-item'
import { TeamFlagComponent } from '../team-flag/team-flag'
import { PointsBadge } from '../points-badge/points-badge'

@Component({
    selector: 'app-history-item',
    imports: [TeamFlagComponent, PointsBadge],
    templateUrl: './history-item.html',
    styleUrl: './history-item.css',
})

export class HistoryItemComponent {
    public item = input.required<UserHistoryItem>()
}
