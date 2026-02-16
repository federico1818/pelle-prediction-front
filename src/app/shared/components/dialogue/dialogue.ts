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

    public write(text: string, maxWords: number = 20): void {
        this.clear()
        this.queue = []

        if (maxWords > 0) {
            const words = text.split(' ')
            let currentChunk: string[] = []

            for (const word of words) {
                currentChunk.push(word)
                if (currentChunk.length >= maxWords) {
                    this.queue.push(currentChunk.join(' '))
                    currentChunk = []
                }
            }

            if (currentChunk.length > 0) {
                this.queue.push(currentChunk.join(' '))
            }
        } else {
            this.queue.push(text)
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
