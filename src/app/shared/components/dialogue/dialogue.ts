import { AfterViewInit, Component, input, InputSignal } from '@angular/core'
import { Dialogue as DialogueModel } from '../../models/dialogue'
import { DialogueText } from '../dialogue-text/dialogue-text'

@Component({
    selector: 'app-dialogue',
    imports: [DialogueText],
    templateUrl: './dialogue.html',
    styleUrl: './dialogue.css',
})

export class Dialogue implements AfterViewInit {
    public dialogue: InputSignal<DialogueModel> = input.required<DialogueModel>()

    public ngAfterViewInit(): void {
        console.log(this.dialogue())
    }
}
