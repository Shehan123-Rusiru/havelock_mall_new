import { tsConstructorType } from '@babel/types';
import React,{Component} from 'react';
import { variables } from './Variables.js';


export class Employee extends Component{
   
    constructor(props){
        super(props);

        this.state={
         department:[],
            employee:[],
            Modeltitle:"",
            Employeeid:0,
            EmployeeName:"",
            departmentName:"",
            dateofjoining:"",
            Photofilename:"anonymous.png",
            photopath:variables.PHOTO_URL

        }
    }

refreshList(){
    fetch(variables.API_URL+'employee')
    .then(response=>response.json())
    .then(data=>{
        this.setState({employee:data});
    });
}



componentDidMount(){
    this.refreshList();
}

changeDepartmentName =(e)=>{
    this.setState({departmentName:e.target.value});
}
changeEmployeeName =(e)=>{
    this.setState({EmployeeName:e.target.value});
}
changedateofJoining =(e)=>{
    this.setState({dateofjoining:e.target.value});
}

addClick(){
    this.setState({
        Modeltitle:"add Employee",
        Employeeid:0,
        EmployeeName:"",
        departmentName:"",
        dateofjoining:"",
        Photofilename:"anonymous.png"
    });
}
editClick(Em){
    this.setState({
        Modeltitle:"edit Employee",
        Employeeid:Em.Employeeid,
        EmployeeName:Em.EmployeeName,
        departmentName:Em.departmentName,
        dateofjoining:Em.dateofjoining,
        Photofilename:Em.Photofilename
    });
}

createClick(){
    fetch(variables.API_URL+'employee',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            EmployeeName:this.state.EmployeeName,
            departmentName:this.state.departmentName,
            dateofjoining:this.state.dateofjoining,
            Photofilename:this.state.Photofilename
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
}

updateClick(){
    fetch(variables.API_URL+'employee',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
         
            EmployeeName:this.state.Employeeid,
            EmployeeName:this.state.EmployeeName,
            departmentName:this.state.departmentName,
            dateofJoining:this.state.dateofjoining,
            
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
DeleteClick(id){
    if(window.confirm('Are you sure?')){
    fetch(variables.API_URL+'employee/'+id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
}
   
    render(){
        const{
            department,
            employee,
            Modeltitle,
            Employeeid,
            EmployeeName,
            departmentName,
            dateofjoining,
            photopath,
            Photofilename
        }=this.state;
        return(
            <div>
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle = "modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Employee
                </button>
                <table className="table table-strped">
                    <thead>
                        <tr>
                            <th>
                                Employee ID
                            </th>
                            <th>
                                Employee Name
                            </th>
                            <th>
                                Department Name
                            </th> 
                            <th>
                                DOJ
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map(Em=>
                            <tr key={Em.Employeeid}>
                                <td>{Em.Employeeid}</td>
                    
                                <td>{Em.EmployeeName}</td>
                                <td>{Em.departmentName}</td>
                                <td>{Em.dateofjoining}</td>
                                <td>
                                    <button type ="buttton" className="btn btn-light mr-1"
                                    data-bs-toggle = "modal"
                                    data-bs-target="#exampleModal"
                                    onClick={()=>this.editClick(Em)}>
                                        
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                                </svg>
                                    </button>
                                
                               
                                    <button type ="buttton" className="btn btn-light mr-1"
                                    onClick={()=>this.DeleteClick(Em.Employeeid)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillrule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </td>
                         
                            </tr>
                            )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{Modeltitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    
                                </button>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3">
                                   <div className="p-2 w-50 bd-highlight">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">EmployeeName</span>
                                        <input type="text" className="form-control"
                                        value={EmployeeName}
                                        onChange={this.changeEmployeeName}/>
                                    </div>
                                    </div>
                                   
                                    
                                    <div className="input-group mb-3">
                                        <img width="250px" height="250px"
                                         src={photopath+Photofilename}/>
                                    </div>
                                    {Employeeid==0?
                                    <button type="butoon"
                                    className="btn btn-primary float-start" 
                                    onClick={()=>this.createClick()}>Create
                                    </button>
                                    :null}

                                    {Employeeid!==0?
                                    <button type="butoon"
                                    className="btn btn-primary float-start"
                                    onClick={()=>this.updateClick()}>Create
                                    
                                    </button>
                                    :null}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}