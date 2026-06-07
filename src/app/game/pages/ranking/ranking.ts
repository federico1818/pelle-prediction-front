import { Component } from '@angular/core'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { Scene } from '../../../shared/models/scene'

@Component({
    selector: 'app-ranking',
    imports: [
        SceneComponent
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
                video: 'scaloni-rec-animated.mp4',
                loop: true
            }
        ]
    }
}
