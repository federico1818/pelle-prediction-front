import { Component, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Prediction } from '../../models/prediction'

@Component({
    selector: 'app-match-prediction-item',
    imports: [CommonModule],
    templateUrl: './match-prediction-item.html',
    styleUrl: './match-prediction-item.css',
    host: {
        'class': 'prediction-item-host'
    }
})
export class MatchPredictionItem {
    public prediction = input.required<Prediction>()

    public getPointsClass(points: number | null): string {
        if (points === null) return 'points-null'
        if (points === 3) return 'points-exact'
        if (points === 1) return 'points-trend'
        return 'points-none'
    }
}
