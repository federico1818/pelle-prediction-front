import { Component, ElementRef, Input, ViewChild } from '@angular/core'

@Component({
    selector: 'app-video',
    imports: [],
    templateUrl: './video.html',
    styleUrl: './video.css',
})

export class Video {
    @ViewChild('video') video!: ElementRef<HTMLVideoElement>
    @Input() src: string = ''

    public get srcVideo(): string {
        return `/assets/video/${this.src}`
    }

    public play(): void {
        this.video.nativeElement.play()
    }
}
