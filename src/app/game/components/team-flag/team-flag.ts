import { Component, Input } from '@angular/core'
import { Team } from '../../models/team'

@Component({
    selector: 'app-team-flag',
    imports: [],
    templateUrl: './team-flag.html',
    styleUrl: './team-flag.css',
})
export class TeamFlagComponent {
    @Input({ required: true }) team!: Team
}
