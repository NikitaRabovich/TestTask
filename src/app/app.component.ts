import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  tagsForm = new FormControl('');
  editTagsForm = new FormControl('');
  displayedTags = [];
  separators = new RegExp(/[\n,;]+/g);

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.displayedTags = localStorage.getItem('tags').split(',');
  }

  addTags() {
    var tags = this.filterNumeric(this.tagsForm.value.replace(/[^\S\n]/g, '').split(this.separators));
    if (tags.length > 0 && !this.displayedTags.length) {
      localStorage.setItem('tags', tags.join());
      this.displayedTags = localStorage.getItem('tags').split(',');
    } else if (tags.length > 0 && this.displayedTags.length > 0) {
      localStorage.setItem('tags', this.displayedTags.join() + ',' + tags.join());
      this.displayedTags = localStorage.getItem('tags').split(',');
    }
  }

  open(modal) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
    this.editTagsForm.setValue(this.displayedTags);
  }

  editTags() {
    var editedTags = this.filterNumeric(this.editTagsForm.value.toString().replace(/[^\S\n]/g, '').split(this.separators));
    localStorage.removeItem('tags');
    localStorage.setItem('tags', editedTags.join());    
    this.displayedTags = localStorage.getItem('tags').split(',');
  }

  removeTag(i) {
    this.displayedTags.splice(i, 1);
    localStorage.removeItem('tags');
    localStorage.setItem('tags', this.displayedTags.join());
  }

  filterNumeric(arr) {
    return arr.filter(function(number) {
      return !isNaN(number) && number;
    });
  }
}
