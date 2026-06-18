import { Component, input, OnInit, OnDestroy, signal } from '@angular/core'
import { Game, isGamePlaying, isGameFinished, getGameTimeRemainingString } from '../../models/game'

@Component({
    selector: 'app-match-time-status',
    imports: [],
    templateUrl: './match-time-status.html',
    styleUrl: './match-time-status.css',
})
export class MatchTimeStatusComponent implements OnInit, OnDestroy {
    public game = input.required<Game>()

    public countdown = signal<string>('')
    private _intervalId: any

    public ngOnInit(): void {
        this.updateCountdown()
        if (!isGamePlaying(this.game()) && !isGameFinished(this.game())) {
            this._intervalId = setInterval(() => {
                this.updateCountdown()
            }, 1000)
        }
    }

    private updateCountdown(): void {
        if (isGamePlaying(this.game())) {
            this.countdown.set('En juego')
            if (this._intervalId) {
                clearInterval(this._intervalId)
                this._intervalId = null
            }
            return
        }
        if (isGameFinished(this.game())) {
            this.countdown.set('Finalizado')
            if (this._intervalId) {
                clearInterval(this._intervalId)
                this._intervalId = null
            }
            return
        }
        this.countdown.set(getGameTimeRemainingString(this.game()))
    }

    public ngOnDestroy(): void {
        if (this._intervalId) {
            clearInterval(this._intervalId)
        }
    }
}
