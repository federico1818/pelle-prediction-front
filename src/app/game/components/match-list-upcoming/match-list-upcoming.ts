import { Component, inject, OnInit, signal } from '@angular/core'
import { GamesService } from '../../services/games-service'
import { MatchWithStatusComponent } from '../match-with-status/match-with-status'
import { Scene } from '../../../shared/models/scene'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { Loading } from '../../../shared/components/loading/loading'
import { forkJoin } from 'rxjs'

@Component({
    selector: 'app-match-list-upcoming',
    imports: [MatchWithStatusComponent, SceneComponent, Loading],
    templateUrl: './match-list-upcoming.html',
    styleUrl: './match-list-upcoming.css',
})

export class MatchListUpcoming implements OnInit {
    protected _gamesService = inject(GamesService)
    public games = this._gamesService.upcoming
    public isLoading = signal(true)

    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: '¡Que no se te escape la tortuga! Hacé tu pronóstico',
                src: 'scenes/maradona.webp',
                type: 'rpg'
            }
        ]
    }

    public ngOnInit(): void {
        forkJoin({
            all: this._gamesService.all(),
            playoffs: this._gamesService.getPlayoffs()
        }).subscribe({
            next: () => this.isLoading.set(false),
            error: () => this.isLoading.set(false)
        })
    }
}
