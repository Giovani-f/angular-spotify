import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { catchError, of, switchMap } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.clear();
    router.navigate(['/login']);
    return false;
  }
  return inject(SpotifyService)
    .initUser()
    .pipe(
      switchMap(success => {
        if (!success) {
          router.navigate(['/login']);
          return of(false);
        }
        return of(true);
      }),
      catchError(error => {
        console.error('Erro ao verificar a autorização:', error);
        return of(false);
      })
    );
};
