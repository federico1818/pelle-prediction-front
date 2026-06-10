import { Component, inject, OnInit, Signal, signal } from '@angular/core'
import { TeamsService } from '../../services/teams-service'
import { Team } from '../../models/team'

@Component({
    selector: 'app-champion-selected',
    imports: [],
    templateUrl: './champion-selected.html',
    styleUrl: './champion-selected.css',
})
export class ChampionSelected implements OnInit {
    private _teamsService: TeamsService = inject(TeamsService)
    public selectedChampion!: Signal<Team | null>

    ngOnInit(): void {
        this.selectedChampion = this._teamsService.selectedChampion
    }
}
