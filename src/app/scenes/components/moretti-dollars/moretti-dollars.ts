import { AfterViewInit, Component, Signal, viewChild } from '@angular/core'
import { DialogueText } from '../../../shared/components/dialogue-text/dialogue-text';

@Component({
    selector: 'app-moretti-dollars',
    standalone: true,
    imports: [DialogueText],
    templateUrl: './moretti-dollars.html',
    styleUrl: './moretti-dollars.css',
})

export class MorettiDollars implements AfterViewInit {
    public dialogueElement: Signal<DialogueText | undefined> = viewChild<DialogueText>('dialogueRef')
    public dialogueText = 'Tienes tiempo hasta el jueves 11 para editar tu favorito. Por cierto, ¿cómo está el nene?'

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.dialogueElement()?.play()
        })
    }
}
