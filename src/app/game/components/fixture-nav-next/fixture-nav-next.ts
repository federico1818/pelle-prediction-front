import { Component, inject } from '@angular/core'
import { FixtureService } from '../../services/fixture-service'
import { ButtonIcon } from '../../../shared/components/button-icon/button-icon'

@Component({
    selector: 'app-fixture-nav-next',
    imports: [ButtonIcon],
    templateUrl: './fixture-nav-next.html',
    styleUrl: './fixture-nav-next.css',
})

export class FixtureNavNext {
    private _fixtureService = inject(FixtureService)

    public goNext(): void {
        this._fixtureService.goNext()
    }
}
