import { Component, input, InputSignal } from '@angular/core'
import { DialogueText } from '../dialogue-text/dialogue-text'
import { Video } from '../video/video'
import { Scene as SceneModel } from '../../models/scene'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-scene',
    standalone: true,
    imports: [
        CommonModule,
        DialogueText,
        Video
    ],
    templateUrl: './scene.html',
    styleUrl: './scene.css',
})
export class SceneComponent {
    public scene: InputSignal<SceneModel | null> = input<SceneModel | null>(null)
}
