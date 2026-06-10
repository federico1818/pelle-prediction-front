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
                text: 'Tenés tiempo hasta el jueves 11 al comienzo del primer partido para seleccionar un favorito.',
                src: 'scenes/moretti-dollars.png',
                type: 'rpg'
            }
        ]
    }
}
