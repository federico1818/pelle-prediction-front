import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core'
import { SceneService } from '../../services/scene-service'
import { Scene as SceneModel } from '../../../shared/models/scene'
import { Scene as SceneComponent } from '../../components/scene/scene'

@Component({
    selector: 'app-intro',
    imports: [
        SceneComponent
    ],
    templateUrl: './intro.html',
    styleUrl: './intro.css',
})

export class Intro implements OnInit {
    private _sceneService: SceneService = inject(SceneService)
    public scene: WritableSignal<SceneModel | null> = signal<SceneModel | null>(null)

    ngOnInit(): void {
        this._sceneService.get('intro').subscribe((scene: SceneModel) => {
            this.scene.set(scene)
        })
    }
}
