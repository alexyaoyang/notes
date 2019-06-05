import { Component, OnInit } from '@angular/core';
import * as marked from 'marked';
import * as JsSearch from 'js-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notes: any[];
  filteredNotes: any[];
  currentNote: any;
  currentNoteParsed: string;
  search: any;
  searchTerm: string;

  onAddNote(){
    this.currentNote = { body: '', noteId: localStorage.length };
    this.currentNoteParsed = '';
    this.notes.push(this.currentNote);
    this.onSearch(this.searchTerm);
  }
  onSearch(searchTerm: string){
    this.searchTerm = searchTerm;
    this.filteredNotes = searchTerm ? this.search.search(searchTerm) : this.notes;
  }
  openNote(i: number){
    this.currentNote = this.notes[i];
    this.parseBody();
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
    }
    this.sortNotes();
    if(this.notes) this.openNote(0);
    this.filteredNotes = this.notes;
    console.log(localStorage, this.notes);

    this.search = new JsSearch.Search('noteId');
    this.search.tokenizer = new JsSearch.StopWordsTokenizer(new JsSearch.SimpleTokenizer());
    this.search.addIndex('body');
    this.search.addDocuments(this.notes);
  }
}
