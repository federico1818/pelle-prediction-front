import { Injectable, inject, signal } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class FixtureService {
    private _router = inject(Router)

    public currentMonth = signal<number>(1)
    public currentDay = signal<number>(1)

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
        const prev = this.getPreviousDate(this.currentMonth(), this.currentDay())
        this._router.navigate(['/game/matches/fixture', prev.month, prev.day])
    }

    public goNext(): void {
        const next = this.getNextDate(this.currentMonth(), this.currentDay())
        this._router.navigate(['/game/matches/fixture', next.month, next.day])
    }
}
