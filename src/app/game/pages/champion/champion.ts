import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core'
import { TeamsService } from '../../services/teams-service'
import { Team } from '../../models/team'

@Component({
    selector: 'app-champion',
    imports: [],
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
