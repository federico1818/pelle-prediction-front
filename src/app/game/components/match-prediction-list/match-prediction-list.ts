import { Component, input } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatchPredictionItem } from '../match-prediction-item/match-prediction-item'

import { Prediction } from '../../models/prediction'

@Component({
    selector: 'app-match-prediction-list',
    imports: [CommonModule, MatchPredictionItem],
    templateUrl: './match-prediction-list.html',
    styleUrl: './match-prediction-list.css'
})

export class MatchPredictionList {
    public predictions = input<Prediction[]>([])
}
