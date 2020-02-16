import { Injectable, EventEmitter } from '@angular/core';
import { Comments } from "../model/comments.model";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  commentsSubject: BehaviorSubject<Comments[]>;

  commentList: Comments[] = [
    new Comments("Mr Jack", "Please check the uploaded Files", "2020/02/12", "Not Viewed")
  ];

  constructor() {
    this.commentsSubject = new BehaviorSubject<Comments[]>(this.commentList)
   }

  addComment(newComment: Comments) {
    return new Promise(resolve => {
      //console.log("Retrieved enquiry");
      //console.log(newComment);
      this.commentList.unshift(newComment);
      //console.log(this.commentList);
      //basically, you update this listener with the new list, 
      //anyone that is subscribing to the enquiry will get the latest list
      this.commentsSubject.next(this.commentList);
      //console.log("triggered behaviour subject");
      resolve(true);
    });
  };

  getCommentListener() {
    return this.commentsSubject.asObservable();
  }

  loadComments() {
    return this.commentList.slice();
  }

}
