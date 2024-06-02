import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { faTachometerAlt, faWrench, faCircle, faShapes, faPaintRoller, faPhone, faQuestionCircle, faCog, faChartLine, faPalette  } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
  faCog: IconProp = faCog;
  faChartLine: IconProp = faChartLine;
  faPalette : IconProp =   faPalette;
  showChildren: boolean = false;
  showSubmenu: { [key: string]: boolean } = {};
  message: string | undefined;

  constructor(private router: Router, private jwtService: JwtService) {}
 
  ngOnInit(): void {
    this.hello();
  }

  navigate(path: string, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate([path]);
  }

  toggleChildren(event: MouseEvent): void {
    event.stopPropagation();
    this.showChildren = !this.showChildren;
  }

  toggleSubmenu(event: MouseEvent, submenuKey: string): void {
    event.stopPropagation();
    this.showSubmenu = {
      ...this.closeAllSubmenusExcept(submenuKey),
      [submenuKey]: !this.showSubmenu[submenuKey]
    };
  }

  closeAllSubmenusExcept(submenuKey: string): { [key: string]: boolean } {
    const newSubmenuState: { [key: string]: boolean } = {};
    Object.keys(this.showSubmenu).forEach(key => {
      newSubmenuState[key] = key === submenuKey ? this.showSubmenu[key] : false;
    });
    return newSubmenuState;
  }


  childClicked(event: MouseEvent): void {
    event.stopPropagation();
  }

  hello(): void {
    this.jwtService.hello().subscribe(
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
    window.location.href = '/dashboard';
  }
}
