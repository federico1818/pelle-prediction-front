import { Component, signal } from '@angular/core'

@Component({
    selector: 'app-dialogue',
    imports: [],
    templateUrl: './dialogue.html',
    styleUrl: './dialogue.css',
})

export class Dialogue {
    public text = signal<string>('')

    private speed: number = 60
    private intervalId: number | null = null

    public write(text: string): void {
        this.clear()
        this.text.set('')
        this.typeText(text)
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
