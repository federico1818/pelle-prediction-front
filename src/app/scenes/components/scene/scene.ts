import { Component, input, InputSignal, ViewChild, AfterViewInit } from '@angular/core'
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

export class Scene implements AfterViewInit {
    @ViewChild('dialogueRef') dialogueElement!: Dialogue
    public scene: InputSignal<SceneModel | null> = input<SceneModel | null>(null)

    public ngAfterViewInit(): void {
        this.dialogueElement.write(this.scene()?.dialogue!)
    }
}
