import { Component, input } from '@angular/core'

@Component({
    selector: 'app-match-prediction-box',
    imports: [],
    templateUrl: './match-prediction-box.html',
    styleUrl: './match-prediction-box.scss',
    host: {
        '[class.predicted]': 'predicted()'
    }
})

export class MatchPredictionBox {
    public predicted = input<boolean>(false)
}
