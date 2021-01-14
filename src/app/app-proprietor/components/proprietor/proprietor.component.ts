import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../../../services/auth.service';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-proprietor',
  templateUrl: './proprietor.component.html',
  styleUrls: ['./proprietor.component.scss']
})
export class ProprietorComponent implements OnInit {

  busName;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.busName = this.authService.userProprietoryBusName().split(' ').join('_');
    this.router.navigate([this.busName, 'panel'], {relativeTo: this.route});
  }

}
