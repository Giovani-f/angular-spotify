import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class SidebarNavigationComponent implements OnInit {
  playlistIcon = faMusic;
  menuItems = [
    {
      description: 'Home',
      icon: faHome,
      route: '/player/home',
      redirect: true,
    },
    {
      description: 'Search',
      icon: faSearch,
      route: '/player/search',
      redirect: false,
    },
    {
      description: 'Artists',
      icon: faGuitar,
      route: '/player/artists',
      redirect: true,
    },
  ];
  selectedMenuItem = 'Home';

  playlistItems: IPlaylist[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.getPlaylists(token!);
  }

  onClick(name: string, redirect?: boolean): void {
    this.selectedMenuItem = name;
    this.router.navigateByUrl(`/player/${name.toLowerCase()}`);
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
