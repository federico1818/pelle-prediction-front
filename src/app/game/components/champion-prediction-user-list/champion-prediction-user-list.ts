import { Component, input } from '@angular/core'
import { ChampionPrediction } from '../../models/champion-prediction'

@Component({
    selector: 'app-champion-prediction-user-list',
    imports: [],
    templateUrl: './champion-prediction-user-list.html',
    styleUrl: './champion-prediction-user-list.css',
})

export class ChampionPredictionUserList {
    public predictions = input<ChampionPrediction[]>([])
}
