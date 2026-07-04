import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../../shared/services/auth-service'

@Component({
    selector: 'app-callback',
    imports: [],
    templateUrl: './callback.html',
    styleUrl: './callback.css',
})

export class Callback implements OnInit {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private router: Router = inject(Router)
    private authService: AuthService = inject(AuthService)

    public ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            const token = params.get('token')
            const intro = params.get('intro')
            const role = params.get('role') || 'user'
            if (token) {
                this.authService.login(token, role)
                if (intro === 'true') {
                    this.router.navigate(['/intro'])
                } else {
                    this.router.navigate(['/game/home'])
                }
            } else {
                this.router.navigate(['/auth/login'])
            }
        })
    }
}
