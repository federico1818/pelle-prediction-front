import { Component, input, OnInit, OnDestroy, signal, computed } from '@angular/core'
import { Game, isGamePlaying, isGameFinished, getGameTimeRemainingString } from '../../models/game'
import { MatchTimeLive } from '../match-time-live/match-time-live'

@Component({
    selector: 'app-match-time-status',
    imports: [MatchTimeLive],
    templateUrl: './match-time-status.html',
    styleUrl: './match-time-status.css',
})

export class MatchTimeStatusComponent implements OnInit, OnDestroy {
    public game = input.required<Game>()

    private _now = signal<Date>(new Date())
    private _intervalId: any

    public isPlaying = computed(() => {
        return isGamePlaying(this.game(), this._now())
    })

    public isFinished = computed(() => {
        return isGameFinished(this.game(), this._now())
    })

    public countdown = computed(() => {
        if (this.isFinished()) {
            return 'Finalizado'
        }
        return getGameTimeRemainingString(this.game(), this._now())
    })

    public ngOnInit(): void {
        if (!this.isFinished()) {
            this._intervalId = setInterval(() => {
                this._now.set(new Date())
                if (this.isFinished()) {
                    this.clearInterval()
                }
            }, 1000)
        }
    }

    private clearInterval(): void {
        if (this._intervalId) {
            clearInterval(this._intervalId)
            this._intervalId = null
        }
    }

    public ngOnDestroy(): void {
        this.clearInterval()
    }
}
