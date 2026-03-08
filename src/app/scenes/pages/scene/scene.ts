import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { SceneService } from '../../services/scene-service'
import { Scene as SceneModel } from '../../../shared/models/scene'
import { Scene as SceneComponent } from '../../components/scene/scene'

@Component({
    imports: [
        SceneComponent
    ],
    templateUrl: './scene.html',
    styleUrl: './scene.css',
})

export class Scene implements OnInit {
    private _sceneService = inject(SceneService)
    private _route = inject(ActivatedRoute)
    public scene: WritableSignal<SceneModel | null> = signal(null)

    ngOnInit(): void {
        this._route.params.pipe(
            switchMap((params) => this._sceneService.get(+params['id']))
        ).subscribe((scene: SceneModel) => {
            this.scene.set(scene)
        })
    }
}
