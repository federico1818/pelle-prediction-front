import { Component, Input } from '@angular/core'
import { Position } from '../../models/position'
import { TeamFlagComponent } from '../team-flag/team-flag'

@Component({
    selector: 'app-position-item',
    imports: [TeamFlagComponent],
    templateUrl: './position-item.html',
    styleUrl: './position-item.css',
})

export class PositionItemComponent {
    @Input({ required: true }) position!: Position
}
