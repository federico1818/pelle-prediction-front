import { Component, input, output } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-button-icon',
    imports: [NgClass],
    templateUrl: './button-icon.html',
    styleUrl: './button-icon.scss'
})

export class ButtonIcon {
    variant = input<'default' | 'outline'>('default')
    size = input<'sm' | 'md' | 'lg'>('sm')
    onClick = output<void>()
}
