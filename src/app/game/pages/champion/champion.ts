import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core'
import { TeamsService } from '../../services/teams-service'
import { Team } from '../../models/team'
import { ChampionListComponent } from '../../components/champion-list/champion-list'

@Component({
    selector: 'app-champion',
    imports: [ChampionListComponent],
    templateUrl: './champion.html',
    styleUrl: './champion.css',
})

export class Champion implements OnInit {
    private _teamsService: TeamsService = inject(TeamsService)
    public teams: WritableSignal<Team[]> = signal<Team[]>([])

    ngOnInit(): void {
        this._teamsService.all().subscribe((teams: Team[]) => {
            console.log('Equipos cargados:', teams)
            this.teams.set(teams)
        })
    }
}
