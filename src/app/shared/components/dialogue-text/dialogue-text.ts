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
    public isComplete: WritableSignal<boolean> = signal<boolean>(false)
    private intervalId: number | null = null
    private speed: number = 70

    public play(): void {
        this.clear()
        const letters: string[] = this.text().split('')
        let index = 0
        this.intervalId = setInterval(() => {
            if (index < letters.length) {
                this.printed.set(this.printed() + letters[index])
                index++
            } else {
                this.stop()
                this.isComplete.set(true)
            }
        }, this.speed)
    }

    private clear(): void {
        this.printed.set('')
        this.isComplete.set(false)
        this.stop()
    }

    private stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    public ngOnDestroy(): void {
        this.clear()
    }
}
