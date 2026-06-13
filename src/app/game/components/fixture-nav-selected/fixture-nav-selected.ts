import { Component, inject, computed } from '@angular/core'
import { FixtureService } from '../../services/fixture-service'

@Component({
    selector: 'app-fixture-nav-selected',
    imports: [],
    templateUrl: './fixture-nav-selected.html',
    styleUrl: './fixture-nav-selected.css',
})

export class FixtureNavSelected {
    private _fixtureService = inject(FixtureService)

    public formattedDate = computed(() => {
        const month = this._fixtureService.currentMonth()
        const day = this._fixtureService.currentDay()
        return this.formatDate(month, day)
    })

    private formatDate(month: number, day: number): string {
        const year = new Date().getFullYear()
        const date = new Date(year, month - 1, day)
        const formatter = new Intl.DateTimeFormat('es-ES', {
            weekday: 'long',
            day: 'numeric',
        })
        return formatter.format(date)
    }
}
