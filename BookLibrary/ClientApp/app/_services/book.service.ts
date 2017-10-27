import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Book } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class BookService {

    private _getBooksUrl: string;
    private _createBookUrl: string;
    private _deleteBookUrl: string;
    private _updateBookUrl: string;

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this._getBooksUrl = baseUrl + 'api/Book/GetBooks';
        this._createBookUrl = baseUrl + 'api/Book/CreateBook/';
        this._deleteBookUrl = baseUrl + 'api/Book/DeleteBook';
        this._updateBookUrl = baseUrl + 'api/Book/UpdateBook/';
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

    updateBook(book: Book): Observable<string> {
        let body = JSON.stringify(book);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this._updateBookUrl, body, options)
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
}
