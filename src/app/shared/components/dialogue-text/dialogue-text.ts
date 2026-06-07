import { Component, InputSignal, OnDestroy, WritableSignal, input, signal } from '@angular/core'
import { DialogueCursor } from '../dialogue-cursor/dialogue-cursor'

@Component({
    selector: 'app-dialogue-text',
    standalone: true,
    imports: [DialogueCursor],
    templateUrl: './dialogue-text.html',
    styleUrl: './dialogue-text.css',
})

export class DialogueText implements OnDestroy {
    public text: InputSignal<string> = input.required<string>()
    public printed: WritableSignal<string> = signal<string>('')
    private intervalId: number | null = null
    private speed: number = 100

    public play(): void {
        this.clear()
        const letters: string[] = this.text().split('')
        let index = 0
        this.intervalId = setInterval(() => {
            if (index < letters.length) {
                this.printed.set(this.printed() + letters[index])
                index++
            } else {
                this.clear()
            }
        }, this.speed)
    }

    private clear(): void {
        this.printed.set('')
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    public ngOnDestroy(): void {
        this.clear()
    }
}
