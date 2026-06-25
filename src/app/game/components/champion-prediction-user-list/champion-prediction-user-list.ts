import { Component, input, inject } from '@angular/core'
import { ChampionPrediction } from '../../models/champion-prediction'
import { ChampionService } from '../../services/champion-service'

@Component({
    selector: 'app-champion-prediction-user-list',
    imports: [],
    templateUrl: './champion-prediction-user-list.html',
    styleUrl: './champion-prediction-user-list.css',
})

export class ChampionPredictionUserList {
    private _championService = inject(ChampionService)
    public predictions = input<ChampionPrediction[]>([])
    public selectedPrediction = this._championService.selected

    public select(prediction: ChampionPrediction): void {
        this._championService.select(prediction)
    }
}
