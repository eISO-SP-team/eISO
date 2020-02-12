import { Component, OnInit } from '@angular/core';
import { CommentsService } from "../shared/service/comments.service";
import { Comments } from "../shared/model/comments.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentsList: Comments[];

  addCommentsForm: FormGroup;
  newEntry: any;
  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  constructor(public commentsService: CommentsService) {
    this.commentsService.getCommentListener()
      .subscribe(newList => {
        console.log("listener triggered");
        console.log(newList);
        this.commentsList = this.commentsService.loadComments();
      })
  }

  ngOnInit() {
    this.addCommentsForm = new FormGroup({
      'description': new FormControl(null, [Validators.required]),
    })
  }

  onAddNewComment() {
    this.newEntry = {
      author: "Bob",
      description: this.addCommentsForm.value.description,
      created_date: this.myDate,
      status: "Not Viewed"
    }
    this.commentsService.addComment(this.newEntry);
  }

}
