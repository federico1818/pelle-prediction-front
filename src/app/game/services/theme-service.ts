import { Injectable, signal, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Injectable({
    providedIn: 'root',
})

export class ThemeService {
    private readonly THEME_KEY = 'theme'
    private readonly DEFAULT_THEME = 'fifa'
    private document = inject(DOCUMENT)

    public currentTheme = signal<string>(this.DEFAULT_THEME)

    constructor() {
        const savedTheme = localStorage.getItem(this.THEME_KEY) || this.DEFAULT_THEME
        this.setTheme(savedTheme)
    }

    public setTheme(theme: string): void {
        this.document.body.classList.remove('classic-light', 'fifa')
        this.document.body.classList.add(theme)
        localStorage.setItem(this.THEME_KEY, theme)
        this.currentTheme.set(theme)
    }
}
