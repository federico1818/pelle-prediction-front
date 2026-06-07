import { Component, Input } from '@angular/core'
import { Position } from '../../models/position'
import { PositionHeaderComponent } from '../position-header/position-header'
import { PositionItemComponent } from '../position-item/position-item'

@Component({
    selector: 'app-position-table',
    imports: [PositionHeaderComponent, PositionItemComponent],
    templateUrl: './position-table.html',
    styleUrl: './position-table.css',
})

export class PositionTableComponent {
    @Input({ required: true }) positions: Position[] = []
}
