import { Injectable, signal } from '@angular/core'

export interface VisibleInsult {
    id: string
    text: string
    top: number
    side: 'left' | 'right'
}

@Injectable({
    providedIn: 'root',
})

export class InsultService {
    private _activeInsults = signal<VisibleInsult[]>([])
    public readonly activeInsults = this._activeInsults.asReadonly()
    
    private intervalId?: any
    private timeouts: any[] = []

    public start(insults: string[]): void {
        this.stop()
        if (!insults || insults.length === 0) return

        const shuffledInsults = [...insults].sort(() => Math.random() - 0.5)
        let index = 0

        // Mostrar el primer insulto a los 500ms
        const firstTimeout = setTimeout(() => {
            this.addInsult(shuffledInsults[index++ % shuffledInsults.length])
        }, 500)
        this.timeouts.push(firstTimeout)

        // Agregar un insulto cada 2.5 segundos
        this.intervalId = setInterval(() => {
            this.addInsult(shuffledInsults[index++ % shuffledInsults.length])
        }, 2500)
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = undefined
        }
        this.timeouts.forEach(t => clearTimeout(t))
        this.timeouts = []
        this._activeInsults.set([])
    }

    private addInsult(text: string): void {
        const id = Math.random().toString(36).substring(2, 9)
        const side: 'left' | 'right' = Math.random() > 0.5 ? 'left' : 'right'
        
        // Altura varía de 8 en 8 entre 16px y 300px (stadium tiene ~400px de altura)
        const minTop = 16
        const maxTop = 224
        const step = 8
        const stepsCount = Math.floor((maxTop - minTop) / step)
        const randomStep = Math.floor(Math.random() * (stepsCount + 1))
        const top = minTop + randomStep * step

        const newInsult: VisibleInsult = { id, text, top, side }
        this._activeInsults.update(current => [...current, newInsult])

        // Remover el insulto después de 2.2 segundos
        const timeout = setTimeout(() => {
            this._activeInsults.update(current => current.filter(i => i.id !== id))
        }, 2200)
        this.timeouts.push(timeout)
    }
}
