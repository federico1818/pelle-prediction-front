import { Component, inject, signal, WritableSignal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'
import { SceneService } from '../../services/scene-service'
import { Scene as SceneModel } from '../../../shared/models/scene'
import { Scene as SceneComponent } from '../../components/scene/scene'

@Component({
    selector: 'app-scene-page',
    imports: [
        SceneComponent
    ],
    templateUrl: './scene.html',
    styleUrl: './scene.css',
})

export class Scene {
    private _sceneService = inject(SceneService)
    private _route = inject(ActivatedRoute)
    public scene: WritableSignal<SceneModel | null> = signal(null)

    public scene$: Observable<SceneModel> = this._route.params.pipe(
        switchMap((params) => this._sceneService.get(+params['id']).pipe(
            tap((scene: SceneModel) => this.scene.set(scene))
        ))
    )
}
