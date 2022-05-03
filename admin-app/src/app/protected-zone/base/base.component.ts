import { Component, Injectable, OnInit } from '@angular/core';

@Component({
    selector: 'base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
@Injectable()
export class BaseComponent implements OnInit {
    public screenTitle = '';
    constructor(private functionCode: string) {}
    
    ngOnInit(): void {
        const data = localStorage.getItem('functions');
        if (data) {
            const functions = JSON.parse(data) as any[];
            functions.forEach((element) => {
                if (element.children) {
                    element.children.forEach((childrenFunction) => {
                        if (childrenFunction.id === this.functionCode) {
                            this.screenTitle = childrenFunction.name;
                        }
                    });
                }
            });
        }
    }
}
