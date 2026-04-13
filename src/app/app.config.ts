import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { authInterceptor } from './interceptors/auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideApollo(() =>{
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({
          uri: 'https://101490785-comp3133-assignment-backe.vercel.app/graphql'
        }),
        cache: new InMemoryCache()
      }
    })
  ]
};
