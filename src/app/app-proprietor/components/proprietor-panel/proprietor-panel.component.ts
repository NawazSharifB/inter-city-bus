import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../services/auth.service';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-proprietor-panel',
  templateUrl: './proprietor-panel.component.html',
  styleUrls: ['./proprietor-panel.component.scss']
})
export class ProprietorPanelComponent implements OnInit {

  busName: string;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.busName = this.authService.userProprietoryBusName().split(' ').join('_');
  }

}
