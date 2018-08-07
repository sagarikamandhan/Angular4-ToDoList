import { Component, OnInit } from '@angular/core';
import{DataService} from '../data.service';
import{Task} from '../model/Tasks';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers : [DataService]
})
export class ToDoComponent implements OnInit {
    Items : Task[] =[];

  constructor(private dataservice : DataService) { }
  getAllTask(){
    this.dataservice.getAllTaskList().subscribe(items=>{
      this.Items.push(items);
      console.log(items);
    });
  }
  addTask(form){
    let newTask : Task ={
      id : this.Items.length+1,
      title : form.value.taskname,
      completed : false
    }
    this.Items.push(newTask);
  }
  ngOnInit() {
    this.getAllTask();
  }

}
