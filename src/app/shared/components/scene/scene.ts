import { CommonModule } from '@angular/common'
import { Component, input, InputSignal } from '@angular/core'
import { Scene as SceneModel } from '../../models/scene'
import { Dialogue } from '../dialogue/dialogue'

@Component({
    selector: 'app-scene',
    standalone: true,
    imports: [
        CommonModule,
        Dialogue
    ],
    templateUrl: './scene.html',
    styleUrl: './scene.css',
})

export class SceneComponent {
    public scene: InputSignal<SceneModel> = input.required<SceneModel>()

}
