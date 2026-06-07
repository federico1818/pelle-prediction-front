import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SceneService } from '../../services/scene-service'
import { SceneComponent } from '../../../shared/components/scene/scene'

@Component({
    selector: 'app-intro',
    imports: [
        SceneComponent
    ],
    templateUrl: './intro.html',
    styleUrl: './intro.css',
})

export class Intro {
    private _sceneService: SceneService = inject(SceneService)
    public scene = toSignal(this._sceneService.get('intro'))
}
