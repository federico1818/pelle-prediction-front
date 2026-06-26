import { Component, input } from '@angular/core'

@Component({
    selector: 'app-theme-item',
    imports: [],
    templateUrl: './theme-item.html',
    styleUrl: './theme-item.css',
})

export class ThemeItem {
    public theme = input.required<{ name: string; label: string }>()
}
