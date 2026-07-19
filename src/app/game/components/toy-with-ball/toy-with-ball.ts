import { Component, input, inject } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-toy-with-ball',
    imports: [],
    templateUrl: './toy-with-ball.html',
    styleUrl: './toy-with-ball.css',
    host: {
        '(click)': 'goToHistory()',
        'style': 'cursor: pointer;'
    }
})

export class ToyWithBall {
    private _router = inject(Router)

    public nickname = input.required<string>()
    public rank = input.required<number>()

    public goToHistory(): void {
        this._router.navigate([
            '/game/stats/history',
            this.nickname().toLowerCase()
        ])
    }
}
