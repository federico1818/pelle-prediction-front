import { Component } from '@angular/core'
import { FixtureNavBack } from '../fixture-nav-back/fixture-nav-back'
import { FixtureNavNext } from '../fixture-nav-next/fixture-nav-next'
import { FixtureNavSelected } from '../fixture-nav-selected/fixture-nav-selected'

@Component({
    selector: 'app-fixture-nav',
    imports: [FixtureNavBack, FixtureNavNext, FixtureNavSelected],
    templateUrl: './fixture-nav.html',
    styleUrl: './fixture-nav.css',
})

export class FixtureNav {
}
