import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core'

@Component({
    selector: 'app-stadium-on-fire',
    imports: [],
    templateUrl: './stadium-on-fire.html',
    styleUrl: './stadium-on-fire.css',
})

export class StadiumOnFire implements AfterViewInit {
    @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

    public ngAfterViewInit(): void {
        this.videoPlayers.forEach(player => {
            const video = player.nativeElement;
            video.muted = true;
            video.play().catch(err => {
                console.warn('Autoplay failed or was prevented:', err);
            });
        });
    }
}
