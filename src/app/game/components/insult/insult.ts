import { Component, input } from '@angular/core'

@Component({
    selector: 'app-insult',
    imports: [],
    templateUrl: './insult.html',
    styleUrl: './insult.css',
})

export class Insult {
    public position = input<'left' | 'right'>('left')
}
