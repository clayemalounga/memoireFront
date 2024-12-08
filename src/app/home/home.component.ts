import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public router: Router, public keycloackService: KeycloakService){
  }

  async seconnecter(){
    await this.keycloackService.login({
      redirectUri:window.location.origin.replace("localhost:4200","localhost:4200/historiquePaiements")
    })
  }
}
