import { Headers, RequestOptions } from '@angular/http';

export class Constant {
    /**
     * DEV CONSTANT
     */
    // public static API = 'http://devurl.com/api/';
    /**
     * QA CONSTANT
     */
    // public static API = 'http://qaurl.com/api/';
    /**
     * UAT CONSTANT
     */
    public static API = 'http://localhost:8080/v1/';
    /**
     * PROD CONSTANT
     */
    // public static API = '';
    public static headers = new Headers({ 'Content-Type': 'application/json' });
    public static options = new RequestOptions({ headers: Constant.headers });
}
