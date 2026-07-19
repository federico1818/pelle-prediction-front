import { Component, input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-points-badge',
    imports: [NgClass],
    templateUrl: './points-badge.html',
    styleUrl: './points-badge.css',
})

export class PointsBadge {
    public points = input<{ value: number; label: string } | null>(null);
}
