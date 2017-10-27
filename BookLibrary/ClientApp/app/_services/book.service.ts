import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Book } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class BookService {

    private baseUrl2: string;
    private _getBooksUrl: string;
    private _getBookUrl: string;
    private _createBookUrl: string;
    private _deleteBookUrl: string;
    private _updateBookUrl: string;

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl2 = baseUrl;
        this._getBooksUrl = this.baseUrl2 + 'api/Book/GetBooks';
        this._getBookUrl = this.baseUrl2 + 'api/Book/GetBook/';
        this._createBookUrl = this.baseUrl2 + 'api/Book/CreateBook/';
        this._deleteBookUrl = this.baseUrl2 + 'api/Book/DeleteBook';
        this._updateBookUrl = this.baseUrl2 + 'api/Book/UpdateBook/';
    }

    getBooks() {
        var headers = new Headers();
        var getContactsUrl = this._getBooksUrl;
        return this.http.get(getContactsUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    createBook(book: Book): Observable<string> {
        let body = JSON.stringify(book);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._createBookUrl, body, options)
            .map(res => "OK")
            .catch(this.handleError);
    }

    deleteBook(id: number): Observable<string> {
        var deleteByIdUrl = this._deleteBookUrl + '?id=' +id;
        return this.http.delete(deleteByIdUrl)
            .map(response => "OK")
            .catch(this.handleError);
    }



    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }

    //TODO: Add DeleteBook
    //TODO: Add UpdateBook
}
//export interface Book {
//    id?: number;
//    isbn?: string;
//    title?: string;
//    author?: string;
//    yearPress?: number;
//    isDeleted?: boolean;
//}