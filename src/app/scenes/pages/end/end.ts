import { Component, inject, signal, WritableSignal } from '@angular/core'
import { Router } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'
import { SceneService } from '../../services/scene-service'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { EndStart } from '../../components/end-start/end-start'
import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary'

@Component({
    selector: 'app-scene-end',
    imports: [
        SceneComponent,
        EndStart,
        ButtonPrimary
    ],
    templateUrl: './end.html',
    styleUrl: './end.css',
})

export class End {
    private _sceneService: SceneService = inject(SceneService)
    private _router: Router = inject(Router)

    public scene = toSignal(this._sceneService.get('end'))
    public visibleStart: WritableSignal<boolean> = signal(true)
    public showPlayButton: WritableSignal<boolean> = signal(false)

    public play(): void {
        this.visibleStart.set(false)
    }

    public onSceneFinished(): void {
        this.showPlayButton.set(true)
    }

    public onPlayClick(): void {
        this._sceneService.seen('end').subscribe(() => {
            this._router.navigate(['/game/home'])
        })
    }
}
