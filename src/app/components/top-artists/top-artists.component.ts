import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { newArtist } from 'src/app/common/factories';
import { IArtist } from 'src/app/interfaces/artists';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss'],
})
export class TopArtistsComponent implements OnInit {
  artist: IArtist = newArtist();
  tracks: any[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.getTopArtists(token!);
    console.log(this.tracks);
  }

  getTopArtists(token: string): void {
    this.spotifyService
      .getTopArtists(token)
      .pipe(
        map(artists => artists.items),
        map(items => {
          return items.map(artist => ({
            id: artist.id,
            name: artist.name,
            imageUrl: artist.images[0].url,
          }));
        }),
        switchMap((artists: IArtist[]) => {
          this.artist = artists[0];
          return this.spotifyService.getTopArtistsTracks(token, this.artist.id);
        })
      )
      .subscribe((tracks: any) => {
        console.log('tracks', tracks);
        this.tracks = tracks.tracks.slice(0, 5);
      });
  }
}
