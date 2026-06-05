import { Component, Input } from '@angular/core'
import { Team } from '../../models/team'
import { ChampionComponent } from '../champion/champion'

@Component({
    selector: 'app-champion-list',
    imports: [ChampionComponent],
    templateUrl: './champion-list.html',
    styleUrl: './champion-list.css',
})
export class ChampionListComponent {
    @Input() teams: Team[] = []
}
