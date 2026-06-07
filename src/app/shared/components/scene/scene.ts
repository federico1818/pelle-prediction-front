import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, input, InputSignal, signal, Signal, viewChildren, WritableSignal, output } from '@angular/core'
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
    public visibleIndex: WritableSignal<number> = signal<number>(0)
    public finished = output<void>()

    public ngAfterViewInit(): void {
        this.play()
    }

    public play(): void {
        this.dialogueElements()[this.visibleIndex()].play()
    }

    public onNext(): void {
        const nextIndex = this.visibleIndex() + 1
        if (nextIndex < this.scene().dialogues.length) {
            this.visibleIndex.set(nextIndex)
            setTimeout(() => {
                this.play()
            })
        } else {
            this.finished.emit()
        }
    }
}
