import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app/app.component';
import { BookComponent } from './components/book/book.component';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

import { BookService } from './_services/book.service'

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();

    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    declarations: [
        AppComponent,
        BookComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        InputTextModule, DataTableModule, ButtonModule, DialogModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'books', pathMatch: 'full' },
            { path: 'books', component: BookComponent },
            { path: '**', redirectTo: 'books' }
        ])
    ],
    providers: [BookService, { provide: RequestOptions, useClass: AppBaseRequestOptions }]
})
export class AppModuleShared {
}
