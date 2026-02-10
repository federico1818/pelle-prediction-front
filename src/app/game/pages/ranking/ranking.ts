import { Component, inject, OnInit } from '@angular/core'
import { DialogueService } from '../../../shared/services/dialogue-service'
import { Dialogue } from '../../../shared/components/dialogue/dialogue'

@Component({
    selector: 'app-ranking',
    imports: [
        Dialogue
    ],
    templateUrl: './ranking.html',
    styleUrl: './ranking.css',
})

export class Ranking implements OnInit {
    private _dialogueService: DialogueService = inject(DialogueService)

    public ngOnInit(): void {
        this._dialogueService.setText('Scaloni está trabajando arduamente en el armado de la lista.')
    }
}
