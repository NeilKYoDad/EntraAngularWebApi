
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

type ProfileType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
})
export class ProfileComponent implements OnInit {
  profile: ProfileType | undefined;
  roles: string[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getProfile(environment.graphApiConfig.uri);
    this.roles = this.authService.getUserRoles();
  }

  getProfile(url: string) {
    this.http.get(url).subscribe((profile) => {
      this.profile = profile;
    });
  }
}
