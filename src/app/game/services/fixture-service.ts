import { Injectable, inject, signal, computed } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class FixtureService {
    private _router = inject(Router)

    public currentMonth = signal<number>(1)
    public currentDay = signal<number>(1)

    public isBackDisabled = computed(() => {
        const month = this.currentMonth()
        const day = this.currentDay()

        if (month < 6) return true
        if (month === 6 && day <= 11) return true
        return false
    })

    public isNextDisabled = computed(() => {
        const month = this.currentMonth()
        const day = this.currentDay()

        if (month > 7) return true
        if (month === 7 && day >= 19) return true
        return false
    })

    public getNextDate(month: number, day: number): { month: number; day: number } {
        const year = new Date().getFullYear()
        const date = new Date(year, month - 1, day)
        date.setDate(date.getDate() + 1)
        return {
            month: date.getMonth() + 1,
            day: date.getDate(),
        }
    }

    public getPreviousDate(month: number, day: number): { month: number; day: number } {
        const year = new Date().getFullYear()
        const date = new Date(year, month - 1, day)
        date.setDate(date.getDate() - 1)
        return {
            month: date.getMonth() + 1,
            day: date.getDate(),
        }
    }

    public setDate(month: number, day: number): void {
        this.currentMonth.set(month)
        this.currentDay.set(day)
    }

    public goPrevious(): void {
        if (this.isBackDisabled()) return
        const prev = this.getPreviousDate(this.currentMonth(), this.currentDay())
        this._router.navigate(['/game/matches/calendar', prev.month, prev.day])
    }

    public goNext(): void {
        if (this.isNextDisabled()) return
        const next = this.getNextDate(this.currentMonth(), this.currentDay())
        this._router.navigate(['/game/matches/calendar', next.month, next.day])
    }
}
