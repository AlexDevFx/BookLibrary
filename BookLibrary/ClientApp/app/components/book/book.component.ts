import { Component, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BookService } from '../../_services/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { DataTableModule } from 'primeng/primeng';

@Component({
    selector: 'book',
    templateUrl: './book.component.html'
})
export class BookComponent {
    public books: Book[];
    private rowData: any[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        console.log(baseUrl + 'api/Book/GetBooks');
        http.get(baseUrl + 'api/Book/GetBooks')
            .map(response => (response).json())
            .subscribe(data => {
                    this.books = data.result;
                    console.log(this.books);
                },
                error => console.error(error));
    }
}

export interface Book {
    id: number;
    isbn: string;
    title: string;
    author: string;
    yearPress: number;
    isDeleted: boolean;
}