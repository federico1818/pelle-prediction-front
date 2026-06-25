import { Component, input, inject, viewChild } from '@angular/core'
import { ChampionPrediction } from '../../models/champion-prediction'
import { ChampionPredictionUserList } from '../champion-prediction-user-list/champion-prediction-user-list'
import { Stadium } from '../stadium/stadium'
import { ChampionService } from '../../services/champion-service'

@Component({
    selector: 'app-champion-prediction-list',
    imports: [
        ChampionPredictionUserList,
        Stadium,
    ],
    templateUrl: './champion-prediction-list.html',
    styleUrl: './champion-prediction-list.css',
})

export class ChampionPredictionList {
    private _championService = inject(ChampionService)
    public predictions = input<ChampionPrediction[]>([])
    public selectedPrediction = this._championService.selected
    public stadium = viewChild(Stadium)

    public onFinishedWalking(): void {
        this._championService.next()
        this.stadium()?.restartWalk()
    }
}
