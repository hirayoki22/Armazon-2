import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let container = <HTMLElement>document.querySelector("#jamf-container");
    let mover = <HTMLElement>document.querySelector("#jamf-mover");

    container.addEventListener("mousemove", (e: MouseEvent) => {
      mover.style.backgroundPositionX = -e.offsetX * 1.8 + "px";
      mover.style.backgroundPositionY = -e.offsetY + 80 + "px";
    });

    container.addEventListener("mouseenter", function() {
      
      setTimeout(function() {
        mover.classList.add("no-more-slidey");
        container.removeEventListener("mouseenter", this);
      }, 250);
      
    });
  }

}
