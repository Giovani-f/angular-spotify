import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment.development';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

type SpotifyUser = {
  id: string;
  display_name: string;
  images: { url: string }[];
};

type SpotifyPlaylist = {
  items: {
    id: string;
    name: string;
    images: { url: string }[];
  }[];
};

type SpotifyArtist = {
  items: {
    id: string;
    name: string;
    images: { url: string }[];
  }[];
};

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  user?: IUser;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  initUser(): Observable<boolean> {
    if (!!this.user) {
      return of(true);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }

    return this.getUser(token).pipe(
      map(user => {
        const data = {
          id: user.id,
          displayName: user.display_name,
          imageUrl: user.images[0].url,
        };
        this.user = data;
        return true;
      }),
      catchError(error => {
        // Lidar com erros, se necessário
        return of(false);
      })
    );
  }

  getLoginUrl(): string {
    const authEndpoint = `${SpotifyConfig.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfig.clientId}&`;
    const redirectUri = `redirect_uri=${SpotifyConfig.redirectUri}&`;
    const scopes = `scope=${SpotifyConfig.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return `${authEndpoint}${clientId}${redirectUri}${scopes}${responseType}`;
  }

  getCallbackAccessToken(): string {
    if (!window.location.hash) {
      return '';
    }

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUser(token: string): Observable<SpotifyUser> {
    return this.httpClient
      .get<SpotifyUser>(`${SpotifyConfig.apiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getUserPlaylists(token: string): Observable<SpotifyPlaylist> {
    return this.httpClient
      .get<SpotifyPlaylist>(`${SpotifyConfig.apiUrl}/me/playlists?limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getTopArtists(token: string): Observable<SpotifyArtist> {
    return this.httpClient
      .get<SpotifyArtist>(`${SpotifyConfig.apiUrl}/me/top/artists?limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getTopArtistsTracks(token: string, artistId: string): Observable<any> {
    return this.httpClient
      .get<any>(
        `${SpotifyConfig.apiUrl}/artists/${artistId}/top-tracks?market=BR&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  signOut(): void {
    localStorage.clear();
    this.user = undefined;
    this.router.navigate(['/login']);
  }
}
