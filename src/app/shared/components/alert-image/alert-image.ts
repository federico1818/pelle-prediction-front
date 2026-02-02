import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-alert-image',
    imports: [],
    templateUrl: './alert-image.html',
    styleUrl: './alert-image.css',
})
export class AlertImage {
    @Input() src!: string

    public get srcImage(): string {
        return `/assets/img/${this.src}`
    }
}
