import { Component, input } from '@angular/core'

@Component({
    selector: 'app-toy-with-ball',
    imports: [],
    templateUrl: './toy-with-ball.html',
    styleUrl: './toy-with-ball.css',
})

export class ToyWithBall {
    public nickname = input.required<string>()
    public rank = input.required<number>()
}
