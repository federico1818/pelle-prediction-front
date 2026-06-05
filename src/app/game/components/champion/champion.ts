import { Component, Input } from '@angular/core'
import { Team } from '../../models/team'
import { ChampionFlag } from '../champion-flag/champion-flag'

@Component({
    selector: 'app-champion',
    imports: [ChampionFlag],
    templateUrl: './champion.html',
    styleUrl: './champion.css',
})
export class ChampionComponent {
    @Input() team!: Team
}
