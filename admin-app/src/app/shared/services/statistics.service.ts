import { MonthlyNewKbsComponent } from './../../protected-zone/statistics/monthly-new-kbs/monthly-new-kbs.component';
import { MonthlyNewCommentsComponent } from './../../protected-zone/statistics/monthly-new-comments/monthly-new-comments.component';
import { MonthlyNewMembersComponent } from './../../protected-zone/statistics/monthly-new-members/monthly-new-members.component';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class StatisticsService extends BaseService {
    private _sharedHeaders = new HttpHeaders();
    constructor(private http: HttpClient) {
        super();
        this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
    }
    getMonthlyNewComments(year: number) {
        return this.http.get<MonthlyNewCommentsComponent[]>(`${environment.apiUrl}/api/statistics/monthly-comments?year=${year}`,
            { headers: this._sharedHeaders })
            .pipe(map((response: MonthlyNewCommentsComponent[]) => {
                return response;
            }), catchError(this.handleError));
    }

    getMonthlyNewKbs(year: number) {
        return this.http.get<MonthlyNewKbsComponent[]>(`${environment.apiUrl}/api/statistics/monthly-newkbs?year=${year}`,
            { headers: this._sharedHeaders })
            .pipe(map((response: MonthlyNewKbsComponent[]) => {
                return response;
            }), catchError(this.handleError));
    }

    getMonthlyNewMembers(year: number) {
        return this.http.get<MonthlyNewMembersComponent[]>(`${environment.apiUrl}/api/statistics/monthly-registers?year=${year}`,
            { headers: this._sharedHeaders })
            .pipe(map((response: MonthlyNewMembersComponent[]) => {
                return response;
            }), catchError(this.handleError));
    }
}