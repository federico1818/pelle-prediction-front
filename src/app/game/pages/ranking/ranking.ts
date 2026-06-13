import { Component } from '@angular/core'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { Scene } from '../../../shared/models/scene'
import { ToyWithBall } from '../../components/toy-with-ball/toy-with-ball'

@Component({
    selector: 'app-ranking',
    imports: [
        SceneComponent,
        ToyWithBall
    ],
    templateUrl: './ranking.html',
    styleUrl: './ranking.css',
})
export class Ranking {
    public rankingScene: Scene = {
        title: 'Ranking no disponible',
        dialogues: [
            {
                text: 'Scaloni está trabajando arduamente en el desarrollo del sistema.',
                src: 'scaloni-rec-animated.mp4',
                type: 'video',
                loop: true
            }
        ]
    }
}
