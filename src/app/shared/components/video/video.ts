import { Component, ElementRef, Input, ViewChild, output } from '@angular/core'

@Component({
    selector: 'app-video',
    imports: [],
    templateUrl: './video.html',
    styleUrl: './video.css',
})

export class Video {
    @ViewChild('video') video!: ElementRef<HTMLVideoElement>
    @Input() src: string = ''
    @Input() loop: boolean = false
    public finished = output<void>()

    public get srcVideo(): string {
        return `/assets/video/${this.src}`
    }

    public play(): void {
        if (this.video?.nativeElement) {
            this.video.nativeElement.currentTime = 0
            this.video.nativeElement.play()
        }
    }

    public onEnded(): void {
        this.finished.emit()
    }
}
