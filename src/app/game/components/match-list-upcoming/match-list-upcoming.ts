import { Component, inject, OnInit } from '@angular/core'
import { GamesService } from '../../services/games-service'
import { MatchListComponent } from '../match-list/match-list'
import { Scene } from '../../../shared/models/scene'
import { SceneComponent } from '../../../shared/components/scene/scene'

@Component({
    selector: 'app-match-list-upcoming',
    imports: [MatchListComponent, SceneComponent],
    templateUrl: './match-list-upcoming.html',
    styleUrl: './match-list-upcoming.css',
})

export class MatchListUpcoming implements OnInit {
    protected _gamesService = inject(GamesService)
    public games = this._gamesService.upcoming

    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: '¡Que no se te escape la tortuga! Hacé tu pronóstico',
                src: 'scenes/maradona.png',
                type: 'rpg'
            }
        ]
    }

    public ngOnInit(): void {
        this._gamesService.all().subscribe()
    }
}
