import { Component, input } from '@angular/core'
import { Ranking } from '../../models/ranking'
import { ToyFighting } from '../toy-fighting/toy-fighting'

@Component({
    selector: 'app-losers',
    imports: [ToyFighting],
    templateUrl: './losers.html',
    styleUrl: './losers.css',
})

export class Losers {
    public users = input.required<Ranking[]>()
}
