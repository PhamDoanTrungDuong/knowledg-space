import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { CommentsService } from './../../../../shared/services';
import { Comment } from './../../../../shared/models/comment.model';

@Component({
  selector: 'comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit, OnDestroy {

  constructor(
    public bsModalRef: BsModalRef,
    private commentsService: CommentsService) {
  }

  private subscription = new Subscription();
  public dialogTitle: string;
  public knowledgeBaseId: number;
  public commentId: number;
  public btnDisabled = false;
  public blockedPanel = false;
  public comment: Comment;

  ngOnInit() {
    if (this.commentId) {
      this.loadFormDetails(this.knowledgeBaseId, this.commentId);
    }
  }
  private loadFormDetails(knowledgeBaseId, commentId) {
    this.blockedPanel = true;
    this.subscription.add(this.commentsService.getDetail(knowledgeBaseId, commentId)
      .subscribe((response: Comment) => {   
        this.comment = response;
        setTimeout(() => { this.blockedPanel = false; this.btnDisabled = false; }, 1000);
      }, error => {
        setTimeout(() => { this.blockedPanel = false; this.btnDisabled = false; }, 1000);
      }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
