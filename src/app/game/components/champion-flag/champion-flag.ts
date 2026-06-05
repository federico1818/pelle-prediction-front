import { Component, Input } from '@angular/core'
import { Team } from '../../models/team'

@Component({
    selector: 'app-champion-flag',
    imports: [],
    templateUrl: './champion-flag.html',
    styleUrl: './champion-flag.css',
})
export class ChampionFlag {
    @Input() team!: Team
    @Input() isSelected: boolean = false
}
