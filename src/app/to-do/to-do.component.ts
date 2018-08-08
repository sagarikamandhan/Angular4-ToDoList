import { Component, OnInit } from '@angular/core';
import{DataService} from '../data.service';
import {Message} from '../Constant/Messages';
import{Task} from '../model/Tasks';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers : [DataService]
})
export class ToDoComponent implements OnInit {
  message : Message = new Message();
  //signle Tasks(2 way binding with view)
    Item : Task = new Task();
  //array of task;
    Items : Task[] =[];
  //assign selected Item to selectedItem variable
    selectedItem : Task;
    //to show/hide the save and add button
    addButton : boolean; saveButton : boolean;
    //to show/hide the alert messages
    added :boolean;deleted : boolean;
    //show add,delete and error message;
    Message : string;DeleteMessage :string;
    ErrorMessage: string;
  //store the next Generated ID
    NextID : number;
  constructor(private dataservice : DataService ) { }
  getAllTask(){
    this.dataservice.getAllTaskList().subscribe(items=>{
      this.Items.push(items);
      this.NextID = this.Items.length+1;
      console.log(items);
    });
  }
  AddTask(form){
    //create the new object and store in Task array
    let newTask : Task ={
      id : this.NextID,
      title : form.value.taskname,
      completed : false
    }
    if(form.value.taskname == null){
      this.ErrorMessage = this.message.ErrorMessage();
      this.ShowAddButton();
    }
    else{
      this.NoMessage();
      this.Items.push(newTask);
      this.NextID =this.Items.length+1;
      this.ShowAddAlerts();
      this.Message =this.message.AddMessage() ;
      form.reset();
      console.log(this.Items);
    }

  }
  Edit(task){
    this.NoMessage();
    this.ShowSaveButton();
    this.HideAlerts();
    this.Item =task;
    this.selectedItem = task;
    console.log(this.Items);
  }

  EditTask(taskform){
    var index =  this.Items.findIndex(x=>x.id === this.selectedItem.id);
    this.Items.splice(index,1);
    let editTask : Task ={
      id : this.selectedItem.id,
      title : taskform.value.taskname,
      completed : this.Item.completed
    }
    this.NoMessage();
    this.Items.push(editTask);
    this.ShowAddButton();
    this.ShowAddAlerts();
    this.Message =this.message.UpdateMessage() ;
    taskform.reset();
    console.log(this.Items);
  }
  DeleteTask(id){
    this.NoMessage();
    var index =  this.Items.findIndex(x=>x.id === id);
    this.Items.splice(index,1);
    this.ShowDeleteAlerts();
    this.DeleteMessage = this.message.DeleteMessage();
    console.log(this.Items);
  }
  UpdateTaskStatus(task){
    this.NoMessage();
    task.completed = !task.completed;
    this.ShowAddAlerts();
    this.Message =this.message.UpdateMessage() ;
    console.log(this.Items);
      }
    ShowAddButton(){
      this.addButton =true;
      this.saveButton =false;
    }
    ShowSaveButton(){
      this.addButton =false;
      this.saveButton =true;
    }
    ShowAddAlerts(){
      this.added = true;
      this.deleted =false;
    }
    ShowDeleteAlerts(){
      this.added =false;
      this.deleted =true;
    }
    HideAlerts(){
      this.added =false;
      this.deleted =false;
    }
    NoMessage(){
      this.DeleteMessage= "";
      this.Message= "";
      this.ErrorMessage="";
    }
  ngOnInit() {
    this.getAllTask();
    this.ShowAddButton();
  }

}
