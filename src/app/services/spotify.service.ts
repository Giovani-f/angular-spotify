import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor() {}

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
    localStorage.setItem('spotify_token', token);
  }
}
