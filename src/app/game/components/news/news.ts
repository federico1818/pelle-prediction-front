import { Component, inject, OnInit } from '@angular/core'
import { NewsService } from '../../services/news-service'
import { SceneComponent } from '../../../shared/components/scene/scene'

@Component({
    selector: 'app-news',
    standalone: true,
    imports: [SceneComponent],
    templateUrl: './news.html',
    styleUrl: './news.css',
})

export class News implements OnInit {
    private _newsService = inject(NewsService)

    public notices = this._newsService.notices

    public ngOnInit(): void {
        this._newsService.get().subscribe()
    }
}
