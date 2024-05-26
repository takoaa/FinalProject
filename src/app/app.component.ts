import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { Observable } from 'rxjs';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faHome: IconProp = faHome;

  faUserPlus: IconProp = faUserPlus;
  faSignInAlt: IconProp = faSignInAlt;
  faSignOutAlt: IconProp = faSignOutAlt
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  navigateToDashboard(): void {
    // Trigger a full page reload
    window.location.href = '/dashboard';
  }
}