import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, input, InputSignal, Signal, viewChildren } from '@angular/core'
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

export class SceneComponent implements AfterViewInit {
    public scene: InputSignal<SceneModel> = input.required<SceneModel>()
    public dialogueElements: Signal<readonly Dialogue[]> = viewChildren<Dialogue>('dialogueRef')
    private index = 0

    public ngAfterViewInit(): void {
        this.play()
    }

    public play(): void {
        this.dialogueElements()[this.index].play()
    }
}
