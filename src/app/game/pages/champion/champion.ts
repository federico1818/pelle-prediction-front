import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core'
import { TeamsService } from '../../services/teams-service'
import { Team } from '../../models/team'
import { ChampionListComponent } from '../../components/champion-list/champion-list'
import { ChampionSelected } from '../../components/champion-selected/champion-selected'
import { DialogueText } from '../../../shared/components/dialogue-text/dialogue-text'

@Component({
    selector: 'app-champion',
    imports: [
        ChampionListComponent,
        ChampionSelected,
        DialogueText
    ],
    templateUrl: './champion.html',
    styleUrl: './champion.css',
})

export class Champion implements OnInit {
    private _teamsService: TeamsService = inject(TeamsService)
    public teams: Signal<Team[]> = this._teamsService.teams
    public canEdit!: Signal<boolean>
    public dialogueText = '¡Parece que un ser maligno no te deja seleccionar a tu selección favorita! ¡Debes negociar con él!'

    ngOnInit(): void {
        this.canEdit = this._teamsService.canEdit
        this._teamsService.all().subscribe()
    }
}
