import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { DialogueText } from '../../../shared/components/dialogue-text/dialogue-text'

@Component({
    selector: 'app-ranking',
    imports: [
        DialogueText
    ],
    templateUrl: './ranking.html',
    styleUrl: './ranking.css',
})

export class Ranking implements AfterViewInit {
    @ViewChild('dialogueRef') dialogueElement!: DialogueText

    public ngAfterViewInit(): void {
        //this.dialogueElement.write('Scaloni está trabajando arduamente en el desarrollo del sistema.')
    }
}
