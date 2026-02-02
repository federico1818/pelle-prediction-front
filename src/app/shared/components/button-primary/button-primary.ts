import { Component, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-button-primary',
    imports: [],
    templateUrl: './button-primary.html',
    styleUrl: './button-primary.css',
})

export class ButtonPrimary {
    @Output() onClick = new EventEmitter<void>()
}
