import { Component } from '@angular/core'
import { Scene } from '../../../shared/models/scene'
import { SceneComponent } from '../../../shared/components/scene/scene'

@Component({
    selector: 'app-moretti-dollars',
    standalone: true,
    imports: [SceneComponent],
    templateUrl: './moretti-dollars.html',
    styleUrl: './moretti-dollars.css',
})

export class MorettiDollars {
    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: 'Tenés tiempo hasta el jueves 11 para seleccionar un favorito. Por cierto, ¿cómo está el nene?',
                src: 'scenes/moretti-dollars.png',
                type: 'image'
            }
        ]
    }
}
