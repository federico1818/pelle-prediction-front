import { Component, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
    selector: 'app-group-list',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './group-list.html',
    styleUrl: './group-list.css',
})
export class GroupListComponent {
    @Input({ required: true }) groups: { name: string; label: string }[] = []
}
