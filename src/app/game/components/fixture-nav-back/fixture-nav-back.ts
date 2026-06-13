import { Component, inject } from '@angular/core'
import { FixtureService } from '../../services/fixture-service'
import { ButtonIcon } from '../../../shared/components/button-icon/button-icon'

@Component({
    selector: 'app-fixture-nav-back',
    imports: [ButtonIcon],
    templateUrl: './fixture-nav-back.html',
    styleUrl: './fixture-nav-back.css',
})

export class FixtureNavBack {
    private _fixtureService = inject(FixtureService)
    public isBackDisabled = this._fixtureService.isBackDisabled

    public goPrevious(): void {
        this._fixtureService.goPrevious()
    }
}
