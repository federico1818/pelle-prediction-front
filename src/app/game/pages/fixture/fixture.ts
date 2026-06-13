import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FixtureService } from '../../services/fixture-service'
import { FixtureNav } from '../../components/fixture-nav/fixture-nav'

@Component({
    selector: 'app-fixture',
    imports: [FixtureNav],
    templateUrl: './fixture.html',
    styleUrl: './fixture.css',
})
export class Fixture implements OnInit {
    private _route = inject(ActivatedRoute)
    private _router = inject(Router)
    private _fixtureService = inject(FixtureService)

    public ngOnInit(): void {
        this._route.paramMap.subscribe(params => {
            const monthParam = params.get('month')
            const dayParam = params.get('day')

            if (!monthParam || !dayParam) {
                const today = new Date()
                const month = today.getMonth() + 1
                const day = today.getDate()
                this._router.navigate(['/game/matches/fixture', month, day])
            } else {
                const month = parseInt(monthParam, 10)
                const day = parseInt(dayParam, 10)
                this._fixtureService.setDate(month, day)
            }
        })
    }
}
