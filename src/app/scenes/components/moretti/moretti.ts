import { Component, inject } from '@angular/core'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { Scene } from '../../../shared/models/scene'
import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary'
import { SceneService } from '../../services/scene-service'
import { TeamsService } from '../../../game/services/teams-service'

@Component({
    selector: 'app-moretti',
    standalone: true,
    imports: [
        SceneComponent,
        ButtonPrimary
    ],
    templateUrl: './moretti.html',
    styleUrl: './moretti.css',
})

export class Moretti {
    private _sceneService: SceneService = inject(SceneService)
    private _teamsService: TeamsService = inject(TeamsService)

    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: 'Si me das los 25.000 dólares que acordamos te dejo elegir a tu selección favorita para el mundial.',
                src: 'scenes/moretti.png',
                type: 'image'
            }
        ]
    }

    public confirmPayment(): void {
        this._sceneService.seen('moretti').subscribe((res: boolean) => {
            if (res) {
                this._teamsService.setCanEdit(true)
            }
        })
    }
}
