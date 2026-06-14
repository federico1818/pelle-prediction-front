import { Component, inject, OnInit, Signal } from '@angular/core'
import { TeamsService } from '../../services/teams-service'
import { Team } from '../../models/team'
import { ChampionListComponent } from '../../components/champion-list/champion-list'
import { ChampionSelected } from '../../components/champion-selected/champion-selected'

@Component({
    selector: 'app-champion',
    imports: [
        ChampionListComponent,
        ChampionSelected,
    ],
    templateUrl: './champion.html',
    styleUrl: './champion.css',
})

export class Champion implements OnInit {
    private _teamsService: TeamsService = inject(TeamsService)
    public teams: Signal<Team[]> = this._teamsService.teams
    public canEdit!: Signal<boolean>

    ngOnInit(): void {
        this.canEdit = this._teamsService.canEdit
        this._teamsService.all().subscribe()
    }
}
