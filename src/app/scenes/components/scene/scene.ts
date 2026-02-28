import { Component, input, ViewChild } from '@angular/core'
import { Dialogue } from '../../../shared/components/dialogue/dialogue'
import { Scene as SceneModel } from '../../../shared/models/scene'

@Component({
    selector: 'app-scene',
    imports: [
        Dialogue
    ],
    templateUrl: './scene.html',
    styleUrl: './scene.css',
})

export class Scene {
    @ViewChild('dialogueRef') dialogueElement!: Dialogue
    public scene = input<SceneModel | null>(null)
}
