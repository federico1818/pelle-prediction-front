import { Component, inject, signal, OnInit } from '@angular/core'
import { Podium } from '../../components/podium/podium'
import { ToyWithBallInBase } from '../../components/toy-with-ball-in-base/toy-with-ball-in-base'
import { RankingService } from '../../services/ranking-service'
import { Ranking as RankingModel } from '../../models/ranking'
import { Loading } from '../../../shared/components/loading/loading'

@Component({
    selector: 'app-ranking',
    imports: [
        ToyWithBallInBase,
        Podium,
        Loading
    ],
    templateUrl: './ranking.html',
    styleUrl: './ranking.css',
})

export class Ranking implements OnInit {
    protected _rankingService = inject(RankingService)
    public list = signal<RankingModel[]>([])
    public isLoading = signal(true)

    public ngOnInit(): void {
        this._rankingService.get().subscribe({
            next: (data: RankingModel[]) => {
                this.list.set(data)
                this.isLoading.set(false)
            },
            error: () => {
                this.isLoading.set(false)
            }
        })
    }
}
