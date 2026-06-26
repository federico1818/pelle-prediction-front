import { Component, input, inject, computed } from '@angular/core'
import { ThemeService } from '../../services/theme-service'

@Component({
    selector: 'app-theme-item',
    imports: [],
    templateUrl: './theme-item.html',
    styleUrl: './theme-item.css',
})

export class ThemeItem {
    private themeService = inject(ThemeService)
    public theme = input.required<{ name: string; label: string }>()

    public isSelected = computed(() => this.themeService.currentTheme() === this.theme().name)

    public selectTheme(): void {
        this.themeService.setTheme(this.theme().name)
    }
}
