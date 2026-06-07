import { Component, input, InputSignal, Signal, viewChild } from '@angular/core'
import { Dialogue as DialogueModel } from '../../models/dialogue'
import { DialogueText } from '../dialogue-text/dialogue-text'
import { Video } from '../video/video'

@Component({
    selector: 'app-dialogue',
    imports: [DialogueText, Video],
    templateUrl: './dialogue.html',
    styleUrl: './dialogue.css',
})

export class Dialogue {
    public dialogue: InputSignal<DialogueModel> = input.required<DialogueModel>()
    public visible: InputSignal<boolean> = input<boolean>(true)

    public textElement: Signal<DialogueText | undefined> = viewChild<DialogueText>('textRef')
    public videoElement: Signal<Video | undefined> = viewChild<Video>('videoRef')

    public play(): void {
        if (this.visible()) {
            this.videoElement()?.play()
            this.textElement()?.play()
        }
    }
}
