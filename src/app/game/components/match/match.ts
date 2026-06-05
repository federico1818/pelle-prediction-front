import { Component, Input } from '@angular/core'
import { Game } from '../../models/game'
import { DatePipe } from '@angular/common'
import { TeamFlagComponent } from '../team-flag/team-flag'

@Component({
    selector: 'app-match',
    imports: [DatePipe, TeamFlagComponent],
    templateUrl: './match.html',
    styleUrl: './match.css',
})
export class MatchComponent {
    @Input({ required: true }) game!: Game
}
