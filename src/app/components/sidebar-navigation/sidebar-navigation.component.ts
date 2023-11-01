import { Component } from '@angular/core';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { IPlaylist } from 'src/app/interfaces/playlist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent {
  playlistIcon = faMusic;
  menuItems = [
    {
      description: 'Home',
      icon: faHome,
      route: '/player/home',
      isActive: true,
    },
    {
      description: 'Search',
      icon: faSearch,
      route: '/player/search',
      isActive: false,
    },
    {
      description: 'Artists',
      icon: faGuitar,
      route: '/player/artists',
      isActive: false,
    },
  ];
  selectedMenuItem = 'Home';

  playlistItems: IPlaylist[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.getPlaylists(token!);
  }

  onClick(name: string): void {
    this.selectedMenuItem = name;
  }

  getPlaylists(token: string): void {
    this.spotifyService
      .getUserPlaylists(token)
      .pipe(
        map(playlists => playlists.items),
        map(items =>
          items.map(item => {
            return {
              id: item.id,
              name: item.name,
              imageUrl: item.images[0]?.url ?? '',
            };
          })
        )
      )
      .subscribe((playlists: IPlaylist[]) => {
        this.playlistItems = playlists;
      });
  }
}
