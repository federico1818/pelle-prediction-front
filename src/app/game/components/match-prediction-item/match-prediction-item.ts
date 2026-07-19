import { Component, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Prediction } from '../../models/prediction'
import { PointsBadge } from '../points-badge/points-badge'

@Component({
    selector: 'app-match-prediction-item',
    imports: [CommonModule, PointsBadge],
    templateUrl: './match-prediction-item.html',
    styleUrl: './match-prediction-item.css',
})

export class MatchPredictionItem {
    public prediction = input.required<Prediction>()
}
