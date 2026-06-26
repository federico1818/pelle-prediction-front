import { Component } from '@angular/core'
import { ThemeItem } from '../theme-item/theme-item'

@Component({
    selector: 'app-theme-list',
    imports: [ThemeItem],
    templateUrl: './theme-list.html',
    styleUrl: './theme-list.css',
})

export class ThemeList {
    public themes = [
        { name: 'fifa', label: 'Mundial' },
        { name: 'classic-light', label: 'Classic' },
    ]
}
