import { Component, inject, OnInit, Signal, signal } from '@angular/core'
import { TeamsService } from '../../services/teams-service'
import { Team } from '../../models/team'
import { Moretti } from '../../../scenes/components/moretti/moretti'
import { MorettiDollars } from '../../../scenes/components/moretti-dollars/moretti-dollars'

@Component({
    selector: 'app-champion-selected',
    imports: [Moretti, MorettiDollars],
    templateUrl: './champion-selected.html',
    styleUrl: './champion-selected.css',
    host: {
        '[class.expanded]': 'expanded()'
    }
})
export class ChampionSelected implements OnInit {
    private _teamsService: TeamsService = inject(TeamsService)
    public selectedChampion!: Signal<Team | null>
    public canEdit!: Signal<boolean>
    public expanded = signal(false)

    public toggleExpanded(): void {
        this.expanded.set(!this.expanded())
    }

    ngOnInit(): void {
        this.selectedChampion = this._teamsService.selectedChampion
        this.canEdit = this._teamsService.canEdit
    }
}
