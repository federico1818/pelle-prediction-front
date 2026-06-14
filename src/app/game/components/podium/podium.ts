import { Component, input } from '@angular/core'
import { ToyWithBall } from '../toy-with-ball/toy-with-ball'
import { Ranking } from '../../models/ranking'

@Component({
    selector: 'app-podium',
    imports: [ToyWithBall],
    templateUrl: './podium.html',
    styleUrl: './podium.css',
})

export class Podium {
    public first = input<Ranking | null>(null)
    public second = input<Ranking | null>(null)
    public third = input<Ranking | null>(null)
}
