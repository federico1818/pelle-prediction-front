import { Component, input, InputSignal } from '@angular/core'

@Component({
    selector: 'app-dialogue-character',
    standalone: true,
    imports: [],
    templateUrl: './dialogue-character.html',
    styleUrl: './dialogue-character.css',
})

export class DialogueCharacter {
    public name: InputSignal<string> = input.required<string>()
}
