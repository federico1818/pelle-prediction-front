import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { Dialogue } from '../../../shared/components/dialogue/dialogue'

@Component({
    selector: 'app-ranking',
    imports: [
        Dialogue
    ],
    templateUrl: './ranking.html',
    styleUrl: './ranking.css',
})

export class Ranking implements AfterViewInit {
    @ViewChild('dialogueRef') dialogueElement!: Dialogue

    public ngAfterViewInit(): void {
        this.dialogueElement.write('Scaloni está trabajando arduamente en el armado de la lista.')
    }
}
