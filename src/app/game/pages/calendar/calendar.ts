import { Component, OnInit, inject, computed } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FixtureService } from '../../services/fixture-service'
import { GamesService } from '../../services/games-service'
import { FixtureNav } from '../../components/fixture-nav/fixture-nav'
import { MatchListComponent } from '../../components/match-list/match-list'

@Component({
    selector: 'app-calendar',
    imports: [FixtureNav, MatchListComponent],
    templateUrl: './calendar.html',
    styleUrl: './calendar.css',
})

export class Calendar implements OnInit {
    private _route = inject(ActivatedRoute)
    private _router = inject(Router)
    private _fixtureService = inject(FixtureService)
    private _gamesService = inject(GamesService)

    public filteredGames = computed(() => {
        const month = this._fixtureService.currentMonth()
        const day = this._fixtureService.currentDay()

        return this._gamesService.getByDate(month, day)
    })

    public ngOnInit(): void {
        this._route.paramMap.subscribe(params => {
            const monthParam = params.get('month')
            const dayParam = params.get('day')

            if (!monthParam || !dayParam) {
                const today = new Date()
                const month = today.getMonth() + 1
                const day = today.getDate()
                this._router.navigate(['/game/matches/calendar', month, day])
            } else {
                const month = parseInt(monthParam, 10)
                const day = parseInt(dayParam, 10)
                this._fixtureService.setDate(month, day)
            }
        })
    }
}
