import { Component, input, InputSignal, output, Signal, viewChild, signal, WritableSignal } from '@angular/core'
import { Dialogue as DialogueModel } from '../../models/dialogue'
import { DialogueText } from '../dialogue-text/dialogue-text'
import { Video } from '../video/video'

@Component({
    selector: 'app-dialogue',
    imports: [DialogueText, Video],
    templateUrl: './dialogue.html',
    styleUrl: './dialogue.css',
    host: {
        '(click)': 'onHostClick()',
        '[class.show]': 'visible()'
    }
})

export class Dialogue {
    public next = output<void>()

    public dialogue: InputSignal<DialogueModel> = input.required<DialogueModel>()
    public visible: InputSignal<boolean> = input<boolean>(true)
    public hasNext: InputSignal<boolean> = input<boolean>(false)

    public textElement: Signal<DialogueText | undefined> = viewChild<DialogueText>('textRef')
    public videoElement: Signal<Video | undefined> = viewChild<Video>('videoRef')

    public textIsFinished: WritableSignal<boolean> = signal<boolean>(false)
    public videoIsFinished: WritableSignal<boolean> = signal<boolean>(false)

    public play(): void {
        if (this.visible()) {
            this.textIsFinished.set(false)
            this.videoIsFinished.set(false)
            this.videoElement()?.play()
            this.textElement()?.play()
        }
    }

    public onTextFinished(): void {
        this.textIsFinished.set(true)
    }

    public onVideoFinished(): void {
        this.videoIsFinished.set(true)
    }

    public onHostClick(): void {
        this._emitWhenFinished()
    }

    private _emitWhenFinished(): void {
        if (this.textIsFinished() && this.videoIsFinished()) {
            this.next.emit()
        }
    }
}
