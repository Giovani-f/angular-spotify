import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.validateSpotifyToken();
  }

  redirectToSpotifyLogin(): void {
    window.location.href = this.spotifyService.getLoginUrl();
  }

  private validateSpotifyToken(): void {
    const spotifyToken = this.spotifyService.getCallbackAccessToken();
    if (!!spotifyToken) {
      this.spotifyService.saveToken(spotifyToken);
    }
  }
}
