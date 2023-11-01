import { Component } from '@angular/core';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent {
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

  onClick(index: number): void {
    this.menuItems.forEach(item => (item.isActive = false));
    this.menuItems[index].isActive = true;
  }
}
