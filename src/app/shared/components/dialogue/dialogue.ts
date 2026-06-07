import { Component, input, InputSignal, Signal, viewChild } from '@angular/core'
import { Dialogue as DialogueModel } from '../../models/dialogue'
import { DialogueText } from '../dialogue-text/dialogue-text'

@Component({
    selector: 'app-dialogue',
    imports: [DialogueText],
    templateUrl: './dialogue.html',
    styleUrl: './dialogue.css',
})

export class Dialogue {
    public dialogue: InputSignal<DialogueModel> = input.required<DialogueModel>()
    public textElement: Signal<DialogueText | undefined> = viewChild<DialogueText>('textRef')

    public play(): void {
        this.textElement()?.play()
    }
}
