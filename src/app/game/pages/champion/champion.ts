import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core'
import { TeamsService } from '../../services/teams-service'
import { Team } from '../../models/team'
import { ChampionListComponent } from '../../components/champion-list/champion-list'
import { ChampionSelected } from '../../components/champion-selected/champion-selected'
import { Scene } from '../../../shared/models/scene'
import { SceneComponent } from '../../../shared/components/scene/scene'

@Component({
    selector: 'app-champion',
    imports: [
        ChampionListComponent,
        ChampionSelected,
        SceneComponent
    ],
    templateUrl: './champion.html',
    styleUrl: './champion.css',
})

export class Champion implements OnInit {
    private _teamsService: TeamsService = inject(TeamsService)
    public teams: Signal<Team[]> = this._teamsService.teams
    public canEdit!: Signal<boolean>
    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: 'Tenés tiempo hasta el jueves 11 para seleccionar un favorito',
                src: 'scenes/moretti.png',
                type: 'rpg',
                character: 'Moretti'
            }
        ]
    }

    ngOnInit(): void {
        this.canEdit = this._teamsService.canEdit
        this._teamsService.all().subscribe()
    }
}
