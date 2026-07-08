import { Component, inject, OnInit, OnDestroy } from '@angular/core'
import { ConfettiService } from '../../../shared/services/confetti-service'

@Component({
    selector: 'app-happy-birthday',
    standalone: true,
    imports: [],
    templateUrl: './happy-birthday.html',
    styleUrl: './happy-birthday.css',
})
export class HappyBirthday implements OnInit, OnDestroy {
    private _confettiService = inject(ConfettiService)
    private intervalId: any

    public ngOnInit(): void {
        this._confettiService.shoot()
        this.intervalId = setInterval(() => {
            this._confettiService.shoot()
        }, 3000)
    }

    public ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    }
}
