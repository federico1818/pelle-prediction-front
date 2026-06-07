import { Component } from '@angular/core'
import { SceneComponent } from '../../../shared/components/scene/scene'
import { Scene } from '../../../shared/models/scene'
import { ButtonPrimary } from '../../../shared/components/button-primary/button-primary'

@Component({
    selector: 'app-moretti',
    standalone: true,
    imports: [
        SceneComponent,
        ButtonPrimary
    ],
    templateUrl: './moretti.html',
    styleUrl: './moretti.css',
})

export class Moretti {
    public scene: Scene = {
        title: '',
        dialogues: [
            {
                text: 'Si me das los 25.000 dólares que acordamos te dejo elegir a tu selección favorita para el mundial.',
                src: 'scenes/moretti.png',
                type: 'image'
            }
        ]
    }

    public confirmPayment(): void {
        console.log('confirmPayment')
    }
}
