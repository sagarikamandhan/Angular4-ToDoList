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
    added :Boolean;deleted : Boolean;
    Message : String;DeleteMessage :String;
    ErrorMessage: String;
    NextID : Number;
  constructor(private dataservice : DataService) { }
  getAllTask(){
    this.dataservice.getAllTaskList().subscribe(items=>{
      this.Items.push(items);
      this.NextID = this.Items.length+1;
      console.log(items);
    });
  }
  AddTask(form){
    let newTask : Task ={
      id : this.NextID,
      title : form.value.taskname,
      completed : false
    }
    if(form.value.taskname == ""){
      this.ErrorMessage = "Please Enter task";
    }
    else{
      this.ErrorMessage="";
      console.log(form.value.taskname);
      this.Items.push(newTask);
      this.NextID =this.Items.length+1;
      this.added = true;
      this.Message ="Added successfully" ;
      console.log(this.Items);
    }

  }
  DeleteTask(id){
    this.Items.splice(id-1,1);
    this.added =false;
    this.deleted =true;
    this.DeleteMessage = "Deleted successfully";
  }
  UpdateTask(task){
    task.completed = !task.completed;
    this.added =true;
    this.deleted =false;
    this.Message ="Updated successfully" ;
      }
  ngOnInit() {
    this.getAllTask();
  }

}
