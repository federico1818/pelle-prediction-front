import { Component, EventEmitter, Output } from '@angular/core'

@Component({
    selector: 'app-button-icon',
    imports: [],
    templateUrl: './button-icon.html',
    styleUrl: './button-icon.css'
})

export class ButtonIcon {
    @Output() onClick = new EventEmitter<void>()
}
