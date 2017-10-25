import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Book } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class BookService {

    private _getBooksUrl = "/Book/GetBooks";
    private _getBookUrl: string = '/Book/GetBook/';
    private _createBookUrl: string = '/Book/CreateBook/';
    private _deleteBookUrl: string = '/Book/DeleteBook/';
    public _updateBookUrl: string = '/Book/UpdateBook/';

    constructor(private http: Http) { }

    getBooks() {
        var headers = new Headers();
        var getContactsUrl = this._getBooksUrl;
        return this.http.get(getContactsUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    //TODO: Add GetBook
    //TODO: Add CreateBook
    //TODO: Add DeleteBook
    //TODO: Add UpdateBook

}