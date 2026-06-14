import { Component, inject, signal, OnInit } from '@angular/core'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { Scene } from '../../../shared/models/scene'
import { ToyWithBall } from '../../components/toy-with-ball/toy-with-ball'
import { Podium } from '../../components/podium/podium'
import { ToyWithBallInBase } from '../../components/toy-with-ball-in-base/toy-with-ball-in-base'
import { RankingService } from '../../services/ranking-service'
import { Ranking as RankingModel } from '../../models/ranking'

@Component({
    selector: 'app-ranking',
    imports: [
        SceneComponent,
        ToyWithBall,
        ToyWithBallInBase,
        Podium
    ],
    templateUrl: './ranking.html',
    styleUrl: './ranking.css',
})

export class Ranking implements OnInit {
    protected _rankingService = inject(RankingService)
    public list = signal<RankingModel[]>([])

    public ngOnInit(): void {
        this._rankingService.get().subscribe((data: RankingModel[]) => {
            this.list.set(data)
        })
    }

    /* public rankingScene: Scene = {
        title: 'Ranking no disponible',
        dialogues: [
            {
                text: 'Scaloni está trabajando arduamente en el desarrollo del sistema.',
                src: 'scaloni-rec-animated.mp4',
                type: 'video',
                loop: true
            }
        ]
    } */
}
