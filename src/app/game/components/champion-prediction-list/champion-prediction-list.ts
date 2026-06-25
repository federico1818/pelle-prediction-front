import { Component, input, inject, viewChild, effect, OnDestroy } from '@angular/core'
import { ChampionPrediction } from '../../models/champion-prediction'
import { ChampionPredictionUserList } from '../champion-prediction-user-list/champion-prediction-user-list'
import { Stadium } from '../stadium/stadium'
import { ChampionService } from '../../services/champion-service'
import { Insult } from '../insult/insult'
import { InsultService } from '../../services/insult-service'

@Component({
    selector: 'app-champion-prediction-list',
    imports: [
        ChampionPredictionUserList,
        Stadium,
        Insult
    ],
    templateUrl: './champion-prediction-list.html',
    styleUrl: './champion-prediction-list.css',
})

export class ChampionPredictionList implements OnDestroy {
    private _championService = inject(ChampionService)
    private _insultService = inject(InsultService)
    public stadium = viewChild(Stadium)
    
    public predictions = input<ChampionPrediction[]>([])
    public selectedPrediction = this._championService.selected
    public activeInsults = this._insultService.activeInsults

    constructor() {
        effect(() => {
            const pred = this.selectedPrediction()
            if (pred) {
                this._insultService.start(pred.team.insults)
            } else {
                this._insultService.stop()
            }
        })
    }

    public onFinishedWalking(): void {
        this._insultService.stop()
        this._championService.next()
        this.stadium()?.restartWalk()
    }

    ngOnDestroy(): void {
        this._insultService.stop()
    }
}
