import { Component, OnInit } from '@angular/core';
import * as marked from 'marked';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notes : any[];
  currentNote : any;
  currentNoteParsed : string;

  onAddNote(){
    this.currentNote = { body: '', noteId: localStorage.length };
    this.currentNoteParsed = '';
    this.notes.push(this.currentNote);
  }
  openNote(noteId: number){
    this.currentNote = this.notes[noteId];
    this.parseBody();
    console.log(this.notes, noteId, this.currentNote);
  }
  saveAndReparse(event: any){
    let newBody = event.target.value;
    this.currentNote.body = newBody;
    this.currentNote.lastSaveDate = new Date().getTime();
    this.parseBody();
    localStorage.setItem(this.currentNote.noteId.toString(), JSON.stringify(this.currentNote));
    this.sortNotes();
  }
  parseBody(){
    this.currentNoteParsed = marked(this.currentNote.body);
  }
  sortNotes(){
    this.notes.sort((a, b) => {
      return b.lastSaveDate - a.lastSaveDate;
    });
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
    this.notes = [];
    if(localStorage.length){
      Object.values(localStorage).forEach(stringNote => {
        let noteObj = JSON.parse(stringNote);
        this.notes[noteObj.noteId] = noteObj;
      });
      this.openNote(0);
    }
    this.sortNotes();
    console.log(localStorage, this.notes);
  }
}
