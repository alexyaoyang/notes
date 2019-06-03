import { Component, OnInit } from '@angular/core';
import {notes} from './notes';
import * as marked from 'marked';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notes = notes;
  chosenNote : any;

  openNote(noteId: number){
    this.chosenNote = notes[noteId];
  }
  saveAndReparse(event: any){
    let newBody = event.target.value;
    this.chosenNote.body = newBody;
    this.chosenNote.parsedBody = marked(newBody);
  }
  ngOnInit(){
    // https://github.com/bvaughn/js-search

    // marked.setOptions({
    //   highlight: function (code, lang, callback) {
    //     require('pygmentize')({ lang: lang, format: 'html' }, code, function (err, result) {
    //       callback(err, result.toString());
    //     });
    //   }
    // });
    notes.forEach(note => {
      note.parsedBody = marked(note.body);
    });
  }
}
