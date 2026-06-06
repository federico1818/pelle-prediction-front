import { Component, model, input } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-match-score-input',
    imports: [FormsModule],
    templateUrl: './match-score-input.html',
    styleUrl: './match-score-input.scss'
})
export class MatchScoreInputComponent {
    public score = model<number | null>(null)
    public side = input<'left' | 'right'>('left')

    public increment(): void {
        this.score.set((this.score() ?? -1) + 1)
    }

    public decrement(): void {
        const current = this.score()
        if (current !== null && current > 0) {
            this.score.set(current - 1)
        }
    }
}
