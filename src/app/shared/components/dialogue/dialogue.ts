import { Component, signal } from '@angular/core'

@Component({
    selector: 'app-dialogue',
    standalone: true,
    imports: [],
    templateUrl: './dialogue.html',
    styleUrl: './dialogue.css',
})

export class Dialogue {
    public text = signal<string>('')

    private speed: number = 60
    private intervalId: number | null = null
    private queue: string[] = []
    private currentFullText: string = ''

    public write(text: string): void {
        this.clear()
        this.queue = []

        const matches = text.match(/[^.!?]+[.!?]*/g)

        if (matches) {
            for (let sentence of matches) {
                sentence = sentence.trim()
                if (sentence.length > 0) {
                    this.queue.push(sentence)
                }
            }
        } else {
            if (text.trim().length > 0) {
                this.queue.push(text.trim())
            }
        }

        this.next()
    }

    public next(): void {
        if (this.intervalId) {
            this.clear()
            this.text.set(this.currentFullText)
            return
        }

        if (this.queue.length > 0) {
            const nextText = this.queue.shift()!
            this.currentFullText = nextText
            this.text.set('')
            this.typeText(nextText)
        }
    }

    private typeText(text: string): void {
        const textArray = text.split('')
        let index = 0

        this.intervalId = window.setInterval(() => {
            if (index < textArray.length) {
                this.text.set(this.text() + textArray[index])
                index++
            } else {
                this.clear()
                setTimeout(() => {
                    this.next()
                }, this.speed * 10)
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
