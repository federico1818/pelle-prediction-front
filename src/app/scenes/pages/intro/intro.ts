import { Component, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SceneService } from '../../services/scene-service'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { IntroStart } from '../../components/intro-start/intro-start'
import { Router } from '@angular/router'

@Component({
    selector: 'app-intro',
    imports: [
        SceneComponent,
        IntroStart
    ],
    templateUrl: './intro.html',
    styleUrl: './intro.css',
})

export class Intro {
    private _sceneService: SceneService = inject(SceneService)
    private _router: Router = inject(Router)

    public scene = toSignal(this._sceneService.get('intro'))
    public visibleStart: WritableSignal<boolean> = signal(true)
    public showPlayButton: WritableSignal<boolean> = signal(false)

    public play(): void {
        this.visibleStart.set(false)
    }

    public onSceneFinished(): void {
        this.showPlayButton.set(true)
    }

    public onPlayClick(): void {
        this._sceneService.seen('intro').subscribe(() => {
            this._router.navigate(['/game/champion'])
        })
    }
}
