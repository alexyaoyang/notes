import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() addNote = new EventEmitter();
  @Output() search = new EventEmitter<string>(true);
  constructor() { }

  doSearch(e){
    this.search.emit(e.srcElement.value);
  }
  ngOnInit() {
  }

}
