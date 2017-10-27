import { Component, Inject, OnInit  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Book } from '../../_models/index';
import { BookService } from '../../_services/book.service'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

class BookInfo implements Book {
    constructor(public id?: number, public isbn?: string, public title?: string, public author?: string, public yearPress?: number, public isDeleted?: boolean) {}
}

@Component({
    selector: 'book',
    templateUrl: './book.component.html'
})

export class BookComponent implements OnInit {
    private rowData: any[];
    public books: Book[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;
    newBook: boolean;
    book: Book = new BookInfo();
    public editBookId: any;

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.editBookId = 0;
        this.loadData();
    }

    loadData() {
        this.bookService.getBooks()
            .subscribe(data => {
                this.rowData = data.result;
                },
                error => console.error(error));
    }

    showDialogToAdd() {
        this.newBook = true;
        this.editBookId = 0;
        this.book = new BookInfo();
        this.displayDialog = true;
    }

    showDialogToDelete(book: Book) {
        console.log(book);
        this.editBookId = book.id;
        this.displayDeleteDialog = true;
    }

    save() {
        this.bookService.createBook(this.book)
            .subscribe(response => {
                this.loadData();
            });
        this.displayDialog = false;
    }

    cancel() {
        this.book = new BookInfo();
        this.displayDialog = false;
    }



    okDelete(isDeleteConfirm: boolean) {
        if (isDeleteConfirm) {
            this.bookService.deleteBook(this.editBookId)
                .subscribe(response => {
                    this.editBookId = 0;
                    this.loadData();
                });
        }
        this.displayDeleteDialog = false;
    }
}

//export interface Book {
//    id?: number;
//    isbn?: string;
//    title?: string;
//    author?: string;
//    yearPress?: number;
//    isDeleted?: boolean;
//}