import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { JwtService } from '../jwt.service'; // Adjust the path based on your project structure
import { faTachometerAlt, faWrench, faCircle, faShapes, faPaintRoller, faPhone, faQuestionCircle, faCog,faChartLine  } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core'; // Import IconProp

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  faTachometerAlt: IconProp = faTachometerAlt;
  faWrench: IconProp = faWrench;
  faCircle: IconProp = faCircle;
  faShapes: IconProp = faShapes;
  faPaintRoller: IconProp = faPaintRoller;
  faPhone: IconProp = faPhone;
  faQuestionCircle: IconProp = faQuestionCircle;
  faCog: IconProp = faCog; // Properly typed now
  faChartLine:IconProp=faChartLine;
  showChildren: boolean = false;
  showSubmenu: { [key: string]: boolean } = {};
  message: string | undefined;



  constructor(private router: Router, private service: JwtService) {}

  ngOnInit(): void {
    this.hello(); // Call hello function on initialization
  }

  // Navigation method to be called on click, replaces routerLink alternatives
  navigate(path: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevents the menu from collapsing
    this.router.navigate([path]); // Navigate programmatically
  }

  toggleChildren(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the event from bubbling up
    this.showChildren = !this.showChildren; // Toggle visibility of children menu
  }

  toggleSubmenu(event: MouseEvent, submenuKey: string): void {
    event.stopPropagation(); // Prevents the event from bubbling up to toggleChildren
    this.showSubmenu = {
      ...this.closeAllSubmenusExcept(submenuKey),
      [submenuKey]: !this.showSubmenu[submenuKey] // Toggle the specific submenu
    };
  }

  // Closes all submenus except the one currently being toggled
  closeAllSubmenusExcept(submenuKey: string): { [key: string]: boolean } {
    const newSubmenuState: { [key: string]: boolean } = {};
    Object.keys(this.showSubmenu).forEach(key => {
      newSubmenuState[key] = key === submenuKey ? this.showSubmenu[key] : false;
    });
    return newSubmenuState;
  }

  // Prevent default action and stop propagation to maintain the state of the menu
  childClicked(event: MouseEvent): void {
    console.log('Child button clicked');
    event.stopPropagation(); // Stops the click from triggering toggleChildren
  }

  hello(): void {
    this.service.hello().subscribe(
      (response) => {
        console.log(response);
        this.message = response.message;
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
  navigateToDashboard(): void {
    // Trigger a full page reload
    window.location.href = '/dashboard';
  }
}