import { Component } from '@angular/core';

import { StadiumOnFire } from '../stadium-on-fire/stadium-on-fire'
import { ToyFighting } from '../toy-fighting/toy-fighting'

@Component({
    selector: 'app-end',
    imports: [StadiumOnFire, ToyFighting],
    templateUrl: './end.html',
    styleUrl: './end.css',
})

export class End {

}
