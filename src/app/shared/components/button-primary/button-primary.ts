import { Component, Output, EventEmitter, input } from '@angular/core'

@Component({
    selector: 'app-button-primary',
    imports: [],
    templateUrl: './button-primary.html',
    styleUrl: './button-primary.css',
})

export class ButtonPrimary {
    public disabled = input<boolean>(false)
    @Output() onClick = new EventEmitter<void>()
}
