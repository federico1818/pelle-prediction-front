import { Component, inject, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { SceneService } from '../../services/scene-service'
import { Scene as SceneModel } from '../../../shared/models/scene'
import { Observable } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'
import { AsyncPipe, NgIf } from '@angular/common'
import { Dialogue } from '../../../shared/components/dialogue/dialogue'

@Component({
    selector: 'app-scene',
    imports: [
        AsyncPipe,
        NgIf,
        Dialogue
    ],
    templateUrl: './scene.html',
    styleUrl: './scene.css',
})
export class Scene {
    @ViewChild('dialogueRef') dialogueElement!: Dialogue

    private _sceneService = inject(SceneService)
    private _route = inject(ActivatedRoute)

    public scene$: Observable<SceneModel> = this._route.params.pipe(
        switchMap((params) => this._sceneService.get(+params['id']).pipe(
            tap((scene) => this.dialogueElement.write(scene.dialogue))
        ))
    )
}
