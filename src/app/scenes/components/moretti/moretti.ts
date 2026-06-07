import { Component, viewChild, Signal, AfterViewInit } from '@angular/core'
import { DialogueText } from '../../../shared/components/dialogue-text/dialogue-text'
import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary'

@Component({
    selector: 'app-moretti',
    standalone: true,
    imports: [
        DialogueText,
        ButtonPrimary
    ],
    templateUrl: './moretti.html',
    styleUrl: './moretti.css',
})
export class Moretti implements AfterViewInit {
    public dialogueElement: Signal<DialogueText | undefined> = viewChild<DialogueText>('dialogueRef')
    public dialogueText = 'Si me das los 25.000 dólares que acordamos te dejo elegir a tu selección favorita para el mundial.'

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.dialogueElement()?.play()
        })
    }

    public confirmPayment(): void {
        console.log('confirmPayment')
    }
}
