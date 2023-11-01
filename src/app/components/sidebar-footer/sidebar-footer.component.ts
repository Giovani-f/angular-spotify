import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/interfaces/user';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.scss'],
})
export class SidebarFooterComponent implements OnInit {
  user: IUser | null = null;
  signOutIcon = faSignOutAlt;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.user = this.spotifyService.user!;
  }

  signOut(): void {
    this.spotifyService.signOut();
  }
}
