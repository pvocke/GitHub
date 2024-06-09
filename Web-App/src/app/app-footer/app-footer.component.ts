import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent {

  constructor(
    readonly router: Router,
    readonly viewportScroller: ViewportScroller
  ) {
    router.events.subscribe
    ((event: NavigationEnd) => {
     
      // Angular v7+
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }


}
