import { Component, input } from '@angular/core'
import { ChampionPrediction } from '../../models/champion-prediction'
import { ChampionPredictionUserList } from '../champion-prediction-user-list/champion-prediction-user-list'

@Component({
    selector: 'app-champion-prediction-list',
    imports: [
        ChampionPredictionUserList
    ],
    templateUrl: './champion-prediction-list.html',
    styleUrl: './champion-prediction-list.css',
})

export class ChampionPredictionList {
    public predictions = input<ChampionPrediction[]>([])
}
