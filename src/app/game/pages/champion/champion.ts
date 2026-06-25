import { Component, inject, OnInit, Signal } from '@angular/core'
import { ChampionService } from '../../services/champion-service'
import { ChampionPredictionList } from '../../components/champion-prediction-list/champion-prediction-list'
import { ChampionPrediction } from '../../models/champion-prediction'
import { Insult } from '../../components/insult/insult'

@Component({
    selector: 'app-champion',
    imports: [
        ChampionPredictionList,
        Insult
    ],
    templateUrl: './champion.html',
    styleUrl: './champion.css',
})

export class Champion implements OnInit {
    private _championService: ChampionService = inject(ChampionService)
    public predictions: Signal<ChampionPrediction[]> = this._championService.predictions

    ngOnInit(): void {
        this._championService.all().subscribe()
    }
}

