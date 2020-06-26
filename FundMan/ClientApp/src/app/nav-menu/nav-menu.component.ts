import { Component } from '@angular/core';
import { ActiveMenuService } from 'src/app/services/active-menu.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  constructor(private menuItemService: ActiveMenuService) {

  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  mouseOver(e) {
    alert(e.target.textContent);
  }

  isActiveMenuItem(title): boolean {
    return title === this.menuItemService.GetCurMenu();
  }
}
