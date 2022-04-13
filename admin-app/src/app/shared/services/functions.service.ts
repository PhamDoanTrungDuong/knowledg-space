import { catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { BaseService } from './base.service';
import { Function } from '../models';

@Injectable({
    providedIn: 'root'
})
export class FunctionsService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }
}
