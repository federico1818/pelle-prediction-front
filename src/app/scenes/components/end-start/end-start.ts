import { Component, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-end-start',
    standalone: true,
    imports: [],
    templateUrl: './end-start.html',
    styleUrl: './end-start.css',
})
export class EndStart {
    @Output() started = new EventEmitter<void>()

    public play(): void {
        this.started.emit()
    }
}
