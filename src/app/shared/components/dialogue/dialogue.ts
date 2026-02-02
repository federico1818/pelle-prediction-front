import { Component, inject, OnInit, signal } from '@angular/core'
import { DialogueService } from '../../services/dialogue-service'

@Component({
    selector: 'app-dialogue',
    imports: [],
    templateUrl: './dialogue.html',
    styleUrl: './dialogue.css',
})

export class Dialogue implements OnInit {
    public text = signal<string>('')

    private _dialogueService: DialogueService = inject(DialogueService)
    private speed: number = 60
    private intervalId: number | null = null

    public ngOnInit(): void {
        this._dialogueService.text$.subscribe((text) => {
            this.clear()
            this.text.set('')
            this.typeText(text)
        })
    }

    private typeText(text: string): void {
        const textArray = text.split('')
        let index = 0

        this.intervalId = window.setInterval(() => {
            this.text.set(this.text() + textArray[index])
            index++

            if (index >= textArray.length) {
                this.clear()
            }
        }, this.speed)
    }

    private clear(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }
}
