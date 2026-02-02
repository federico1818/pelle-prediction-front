import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-button-link',
    imports: [],
    templateUrl: './button-link.html',
    styleUrl: './button-link.css',
})

export class ButtonLink {
    @Input() href!: string
}
