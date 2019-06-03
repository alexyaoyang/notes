import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss']
})
export class NoteListItemComponent implements OnInit {
  @Input() note;
  constructor() { }

  ngOnInit() {
    // this.note.body = marked(this.note.body);
  }

}
