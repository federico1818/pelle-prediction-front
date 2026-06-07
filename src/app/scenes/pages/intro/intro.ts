import { Component, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SceneService } from '../../services/scene-service'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { IntroStart } from '../../components/intro-start/intro-start'

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
    public scene = toSignal(this._sceneService.get('intro'))
    public visibleStart: WritableSignal<boolean> = signal(true)

    public play(): void {
        this.visibleStart.set(false)
    }

}
