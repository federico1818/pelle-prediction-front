import { Component, input } from '@angular/core'

@Component({
    selector: 'app-dialogue-cursor',
    imports: [],
    template: `{{ mode() === 'arrow' ? '▼' : '' }}`,
    styleUrl: './dialogue-cursor.css',
    host: {
        '[class.mode-line]': 'mode() === "line"',
        '[class.mode-arrow]': 'mode() === "arrow"'
    }
})

export class DialogueCursor {
    public mode = input<'line' | 'arrow'>('line')
}
