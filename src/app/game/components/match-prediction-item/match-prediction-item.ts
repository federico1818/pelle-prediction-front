import { Component, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Prediction } from '../../models/prediction'

@Component({
    selector: 'app-match-prediction-item',
    imports: [CommonModule],
    templateUrl: './match-prediction-item.html',
    styleUrl: './match-prediction-item.css',
})

export class MatchPredictionItem {
    public prediction = input.required<Prediction>()
}
