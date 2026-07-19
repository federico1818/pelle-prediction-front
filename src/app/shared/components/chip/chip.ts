import { Component, input, output } from '@angular/core'

@Component({
    selector: 'app-chip',
    imports: [],
    templateUrl: './chip.html',
    styleUrl: './chip.css',
})

export class Chip {
    public selected = input<boolean>(false)
    public clicked = output<void>()

    public onClick(): void {
        this.clicked.emit()
    }
}
