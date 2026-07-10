import { Component, input } from '@angular/core'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { Notice } from '../../models/notice'

@Component({
    selector: 'app-news',
    standalone: true,
    imports: [SceneComponent],
    templateUrl: './news.html',
    styleUrl: './news.css',
})

export class News {
    public notices = input.required<Notice[]>()
}