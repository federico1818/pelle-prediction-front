import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-group-name',
    templateUrl: './group-name.html',
    styleUrl: './group-name.css',
})

export class GroupNameComponent {
    @Input({ required: true }) label: string = ''
}
