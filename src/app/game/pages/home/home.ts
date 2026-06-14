import { Component } from '@angular/core'
import { Scene } from '../../../shared/models/scene'
import { SceneComponent } from '../../../shared/components/scene/scene'

@Component({
    selector: 'app-home',
    imports: [SceneComponent],
    templateUrl: './home.html',
    styleUrl: './home.css',
})

export class Home {
    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: '¡Que no se te escape la tortuga! Hacé tu pronóstico',
                src: 'scenes/maradona.png',
                type: 'rpg'
            }
        ]
    }
}
