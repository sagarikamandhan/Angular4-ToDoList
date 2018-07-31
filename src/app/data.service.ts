import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http:Http) { }
  getAllTaskList(){
    return this.http.get("https://jsonplaceholder.typicode.com/todos").map(res => res.json());
  }

}
