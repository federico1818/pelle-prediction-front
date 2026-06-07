import { Component, input, InputSignal, ViewChild, ViewChildren, QueryList, computed, signal, effect, Output, EventEmitter, AfterViewInit } from '@angular/core'
import { Dialogue } from '../dialogue/dialogue'
import { Video } from '../video/video'
import { Scene as SceneModel } from '../../models/scene'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-scene',
    standalone: true,
    imports: [
        CommonModule,
        Dialogue,
        Video
    ],
    templateUrl: './scene.html',
    styleUrl: './scene.css',
})
export class SceneComponent {
    public scene: InputSignal<SceneModel | null> = input<SceneModel | null>(null)
}
