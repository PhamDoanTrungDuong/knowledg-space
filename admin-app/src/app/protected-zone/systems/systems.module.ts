import { ValidationMessageModule } from './../../shared/modules/validation-message/validation-message.module';
import { NotificationService } from './../../shared/services/notifications.service';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FunctionsComponent } from './functions/functions.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { SystemsRoutingModule } from './systems-routing.module';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { RolesDetailComponent } from './roles/roles-detail/roles-detail.component';
import { BsModalService, ModalModule  } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';
import { InputTextModule } from 'primeng/inputtext';
import { RolesAssignComponent } from './users/roles-assign/roles-assign.component';
import {CheckboxModule} from 'primeng/checkbox';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CalendarModule} from 'primeng/calendar';
import {TreeTableModule} from 'primeng/treetable';
import {DropdownModule} from 'primeng/dropdown';
import { FunctionsDetailComponent } from './functions/functions-detail/functions-detail.component';
import { CommandsAssignComponent } from './functions/commands-assign/commands-assign.component';

@NgModule({
  declarations: [
    FunctionsComponent,
    UsersComponent,
    RolesComponent,
    PermissionsComponent,
    RolesDetailComponent,
    UsersDetailComponent,
    RolesAssignComponent,
    FunctionsDetailComponent,
    CommandsAssignComponent,
  ],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    PanelModule,
    TableModule,
    PaginatorModule,
    BlockUIModule,
    ButtonModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    InputTextModule,
    CheckboxModule,
    KeyFilterModule,
    CalendarModule,
    TreeTableModule,
    DropdownModule,
    ModalModule.forRoot()
  ],
  providers: [ NotificationService, BsModalService, DatePipe ],
})
export class SystemsModule { }
