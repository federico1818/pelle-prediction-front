import { Component, model } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-match-score',
    imports: [FormsModule],
    templateUrl: './match-score.html',
    styleUrl: './match-score.scss'
})

export class MatchScoreComponent {
    public score = model<number | null>(null)
}
