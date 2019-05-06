import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private updates: SwUpdate) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => {        
        document.location.reload(true);
    })});
  }

  ngOnInit(): void {
  }

}
