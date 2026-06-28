import { Component, OnInit, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PhaseService } from '../../services/phase-service'
import { GamesService } from '../../services/games-service'
import { PhaseList } from '../../components/phase-list/phase-list'

@Component({
    selector: 'app-playoffs',
    imports: [RouterOutlet, PhaseList],
    templateUrl: './playoffs.html',
    styleUrl: './playoffs.css',
})

export class Playoffs implements OnInit {
    private _phaseService = inject(PhaseService)
    private _gamesService = inject(GamesService)

    public phases = this._phaseService.phases

    public ngOnInit(): void {
        this._phaseService.all().subscribe()
        this._gamesService.getPlayoffs().subscribe()
    }
}
