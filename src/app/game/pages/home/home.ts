import { Component, inject, computed, OnInit } from '@angular/core'
import { Scene } from '../../../shared/models/scene'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { GamesService } from '../../services/games-service'
import { MatchListComponent } from '../../components/match-list/match-list'

@Component({
    selector: 'app-home',
    imports: [SceneComponent, MatchListComponent],
    templateUrl: './home.html',
    styleUrl: './home.css',
})

export class Home implements OnInit {
    private _gamesService = inject(GamesService)

    public todayGames = computed(() => this._gamesService.today())

    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: '¡Que no se te escape la tortuga! Completá tus pronósticos para hoy.',
                src: 'scenes/maradona.png',
                type: 'rpg'
            }
        ]
    }

    public ngOnInit(): void {
        this._gamesService.all().subscribe()
    }
}
