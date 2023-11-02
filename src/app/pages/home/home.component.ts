import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ISong } from 'src/app/interfaces/songs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { milissecondsToMinutes } from 'src/app/utils/format-timer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  songs: ISong[] = [];
  playIcon = faPlay;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getSongs(localStorage.getItem('token') || '');
  }

  getSongs(token: string): void {
    this.spotifyService.getLikedSongs(token).subscribe(songs => {
      this.songs = songs;
    });
  }

  fotmatArsists(artists: any[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

  formatTime(milisseconds: number): string {
    return milissecondsToMinutes(milisseconds);
  }
}
