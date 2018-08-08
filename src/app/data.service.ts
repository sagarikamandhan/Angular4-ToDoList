import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http:Http) { }
  //get the data from API http://www.mocky.io/v2/5b69d7203200006e31af5e50
  getAllTaskList(){
    return this.http.get("http://www.mocky.io/v2/5b69d7203200006e31af5e50").map((res : Response)=> res.json());
  }

}
