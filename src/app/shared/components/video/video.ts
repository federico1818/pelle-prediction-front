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
    public finished = output<void>()

    public get srcVideo(): string {
        return `/assets/video/${this.src}`
    }

    public play(): void {
        this.video?.nativeElement.play()
    }

    public onEnded(): void {
        this.finished.emit()
    }
}
