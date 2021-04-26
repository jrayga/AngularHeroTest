import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public currentNavActive = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentNavActive = this.router.url === '/' ? 'dashboard' : this.router.url;
    console.log("🚀 ~ file: nav.component.ts ~ line 18 ~ NavComponent ~ ngOnInit ~ this.currentNavActive", this.currentNavActive)
  }

}
