import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core'

@Component({
    selector: 'app-stadium-on-fire',
    imports: [],
    templateUrl: './stadium-on-fire.html',
    styleUrl: './stadium-on-fire.css',
})

export class StadiumOnFire implements AfterViewInit {
    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

    public ngAfterViewInit(): void {
        if (this.videoPlayer) {
            const video = this.videoPlayer.nativeElement;
            video.muted = true;
            video.play().catch(err => {
            console.warn('Autoplay failed or was prevented:', err);
            });
        }
    }
}
