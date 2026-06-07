import { Component, Input, inject, computed } from '@angular/core'
import { Team } from '../../models/team'
import { ChampionFlag } from '../champion-flag/champion-flag'
import { TeamsService } from '../../services/teams-service'

@Component({
    selector: 'app-champion',
    imports: [ChampionFlag],
    templateUrl: './champion.html',
    styleUrl: './champion.css',
})
export class ChampionComponent {
    @Input() team!: Team

    private _teamsService: TeamsService = inject(TeamsService)

    public isSelected = computed(() => this._teamsService.selectedChampion()?.id === this.team?.id)
    public canEdit = computed(() => this._teamsService.canEdit())

    public select(): void {
        if (this.team && this._teamsService.canEdit()) {
            this._teamsService.select(this.team).subscribe()
        }
    }
}
