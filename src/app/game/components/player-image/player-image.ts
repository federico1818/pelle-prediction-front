import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-player-image',
    imports: [],
    templateUrl: './player-image.html',
    styleUrl: './player-image.css',
})

export class PlayerImage {
    @Input() image!: string

    public get src(): string {
        return `/assets/img/${this.image}`
    }
}
