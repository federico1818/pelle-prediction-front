import { Component, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-intro-start',
    standalone: true,
    imports: [],
    templateUrl: './intro-start.html',
    styleUrl: './intro-start.css',
})
export class IntroStart {
    @Output() started = new EventEmitter<void>()

    public play(): void {
        this.started.emit()
    }
}
