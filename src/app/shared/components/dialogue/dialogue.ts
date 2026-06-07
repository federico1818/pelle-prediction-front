import { Component, input, InputSignal, output, Signal, viewChild } from '@angular/core'
import { Dialogue as DialogueModel } from '../../models/dialogue'
import { DialogueText } from '../dialogue-text/dialogue-text'
import { Video } from '../video/video'

@Component({
    selector: 'app-dialogue',
    imports: [DialogueText, Video],
    templateUrl: './dialogue.html',
    styleUrl: './dialogue.css',
    host: {
        '(click)': 'onHostClick()'
    }
})

export class Dialogue {
    public next = output<void>()

    public dialogue: InputSignal<DialogueModel> = input.required<DialogueModel>()
    public visible: InputSignal<boolean> = input<boolean>(true)

    public textElement: Signal<DialogueText | undefined> = viewChild<DialogueText>('textRef')
    public videoElement: Signal<Video | undefined> = viewChild<Video>('videoRef')

    private _textIsFinished = false
    private _videoIsFinished = false

    public play(): void {
        if (this.visible()) {
            this.videoElement()?.play()
            this.textElement()?.play()
        }
    }

    public onTextFinished(): void {
        this._textIsFinished = true
    }

    public onVideoFinished(): void {
        this._videoIsFinished = true
    }

    public onHostClick(): void {
        this._emitWhenFinished()
    }

    private _emitWhenFinished(): void {
        if (this._textIsFinished && this._videoIsFinished) {
            this.next.emit()
        }
    }
}
