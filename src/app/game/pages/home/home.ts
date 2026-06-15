import { Component, OnInit, OnDestroy, inject } from '@angular/core'
import { News } from '../../components/news/news'
import { ConfettiService } from '../../../shared/services/confetti-service'

@Component({
    selector: 'app-home',
    imports: [News],
    templateUrl: './home.html',
    styleUrl: './home.css',
})

export class Home implements OnInit, OnDestroy {
    private _confettiService = inject(ConfettiService)
    private _intervalId: any

    public ngOnInit(): void {
        this._confettiService.shoot()
        this._intervalId = setInterval(() => {
            this._confettiService.shoot()
        }, 2000)
    }

    public ngOnDestroy(): void {
        if (this._intervalId) {
            clearInterval(this._intervalId)
        }
    }
}
