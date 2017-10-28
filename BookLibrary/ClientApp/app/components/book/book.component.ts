import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Book, Category } from '../../_models/index';
import { BookService } from '../../_services/book.service'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

class BookInfo implements Book {
    constructor(bookId?: number,
        bookTitle?: string,
        public title?: string,
        public categoryId?: number,
        public categoryName?: string) {
    }
}

class CategoryInfo implements Category {
    constructor(categoryId?: number,
        public categoryName?: string) {
    }
}

@Component({
    selector: 'book',
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
    private rowData: any[];
    public books: Book[];
    public categories: Category[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;
    newBook: boolean;
    book: Book = new BookInfo();
    public editBookId: any;
    public editBookTitle: any;

    constructor(private bookService: BookService) {}

    ngOnInit() {
        this.editBookId = 0;
        this.editBookTitle = '';
        this.loadData();
    }

    loadData() {
        this.bookService.getBooks()
            .subscribe(data => {
                    console.log(data);
                    this.rowData = data.result;
                },
                error => console.error(error));
        this.bookService.getCategories()
            .subscribe(data => {
                    console.log(data);
                    this.categories = data.json;
                },
                error => console.error(error));
    }

    showDialogToAdd() {
        this.newBook = true;
        this.editBookId = 0;
        this.editBookTitle = '';
        this.book = new BookInfo();
        this.displayDialog = true;
    }

    showDialogToEdit(book: Book) {
        this.newBook = false;
        this.book = new BookInfo();
        this.book.bookId = book.bookId;
        this.book.bookTitle = book.bookTitle;
        this.book.categoryId = book.categoryId;
        this.book.categoryName = book.categoryName;
        this.displayDialog = true;
    }

    showDialogToDelete(book: Book) {
        this.editBookId = book.bookId;
        this.editBookTitle = book.bookTitle;
        this.displayDeleteDialog = true;
    }

    save() {
        this.bookService.createBook(this.book)
            .subscribe(response => {
                this.loadData();
            });
        this.displayDialog = false;
    }

    update() {
        this.bookService.updateBook(this.book)
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
                    this.editBookTitle = '';
                    this.loadData();
                });
        }
        this.displayDeleteDialog = false;
    }
}
