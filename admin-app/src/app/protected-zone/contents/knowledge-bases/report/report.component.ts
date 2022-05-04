import { ReportDetailComponent } from './../report-detail/report-detail.component';
import { MessageConstants } from './../../../../shared/constants/messages.constants';
import { Report } from './../../../../shared/models/report.model';
import { Pagination } from './../../../../shared/models/pagination.model';
import { BaseComponent } from './../../../base/base.component';
import { NotificationService } from './../../../../shared/services/notifications.service';
import { ReportsService } from './../../../../shared/services/report.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends BaseComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  // Default
  public bsModalRef: BsModalRef;
  public blockedPanel = false;
  public entityId: number;
  /**
   * Paging
   */
  public pageIndex = 1;
  public pageSize = 10;
  public pageDisplay = 10;
  public totalRecords: number;
  public keyword = '';
  // Role
  public items: any[];
  public selectedItems = [];
  constructor(private reportsService: ReportsService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private modalService: BsModalService) {
      super('CONTENT_REPORT');
     }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscription.add(this.activeRoute.params.subscribe(params => {
      this.entityId = params['knowledgeBaseId'];
    }));
    this.loadData();
  }

  loadData(selectedId = null) {
    this.blockedPanel = true;
    this.subscription.add(this.reportsService.getAllPaging(this.entityId, this.keyword, this.pageIndex, this.pageSize)
      .subscribe((response: Pagination<Report>) => {
        this.processLoadData(selectedId, response);
        setTimeout(() => { this.blockedPanel = false; }, 1000);
      }, error => {
        setTimeout(() => { this.blockedPanel = false; }, 1000);
      }));
  }
  private processLoadData(selectedId = null, response: Pagination<Report>) {
    this.items = response.items;
    this.pageIndex = this.pageIndex;
    this.pageSize = this.pageSize;
    this.totalRecords = response.totalRecords;
    if (this.selectedItems.length === 0 && this.items.length > 0) {
      this.selectedItems.push(this.items[0]);
    }
    if (selectedId != null && this.items.length > 0) {
      this.selectedItems = this.items.filter(x => x.Id === selectedId);
    }
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page + 1;
    this.pageSize = event.rows;
    this.loadData();
  }

  showDetailModel() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
    const initialState = {
      entityId: this.selectedItems[0].id
    };
    this.bsModalRef = this.modalService.show(ReportDetailComponent,
      {
        // initialState: initialState,
        class: 'modal-lg',
        backdrop: 'static'
      });
  }

  deleteItems() {
    const id = this.selectedItems[0].id;
    this.notificationService.showConfirmation(MessageConstants.CONFIRM_DELETE_MSG,
      () => this.deleteItemsConfirm(id));
  }
  deleteItemsConfirm(id) {
    this.blockedPanel = true;
    this.subscription.add(this.reportsService.delete(this.entityId, id).subscribe(() => {
      this.notificationService.showSuccess(MessageConstants.DELETED_OK_MSG);
      this.loadData();
      this.selectedItems = [];
      setTimeout(() => { this.blockedPanel = false; }, 1000);
    }, error => {
      setTimeout(() => { this.blockedPanel = false; }, 1000);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
