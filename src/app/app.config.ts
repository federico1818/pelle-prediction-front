import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

import { routes } from './app.routes'
import { authInterceptor } from './shared/interceptors/auth-interceptor'
import { sessionExpiredInterceptor } from './shared/interceptors/session-expired-interceptor'
import { errorInterceptor } from './shared/interceptors/error-interceptor'
import { unauthorizedInterceptor } from './shared/interceptors/unauthorized-interceptor'

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(withInterceptors([
            authInterceptor,
            sessionExpiredInterceptor,
            errorInterceptor,
            unauthorizedInterceptor,
        ]))
    ]
}