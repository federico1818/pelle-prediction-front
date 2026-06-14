import { Component, input } from '@angular/core'
import { ToyWithBall } from '../toy-with-ball/toy-with-ball'

@Component({
    selector: 'app-toy-with-ball-in-base',
    imports: [ToyWithBall],
    templateUrl: './toy-with-ball-in-base.html',
    styleUrl: './toy-with-ball-in-base.css',
})

export class ToyWithBallInBase {
    public nickname = input.required<string>()
    public rank = input.required<number>()
    public points = input.required<number>()
}
