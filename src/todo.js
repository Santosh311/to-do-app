import React from "react";
class Todo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            all_tasks : []
        }
        this.listofTasks()
    }

    listofTasks =async () => {
        var data =await fetch("http://127.0.0.1:8000/api/")
        var response = await data.json()

        this.setState({
            all_tasks : response
        });

    }

    deleteTask = async (Task) => {
       var data =await fetch(`http://127.0.0.1:8000/delete_task/${Task.id}`)
        this.listofTasks()
    }

    createTask = async (e) =>{
        e.preventDefault()
        var task =document.getElementById("task")
        var formData = new FormData()
        formData.append('title', task.value)
        formData.append("completed", false)
        formData.append('id', null)
        console.log(formData)
        var data =await fetch(`http://127.0.0.1:8000/create_task/`, {
            method:"POST",
            body:formData
        })
        task.value=""
        task.focus()
        this.listofTasks()
    }

     completeUnCompleteTask = async (task) =>{
        task.completed = !task.completed
        var formData = new FormData()
        formData.append('title', task.title)
        formData.append("completed", task.completed)
        formData.append('id', task.id)
        var data =await fetch(`http://127.0.0.1:8000/update_task/${task.id}/`, {
            method:'POST',
            body:formData
        });
        this.listofTasks()
    }



    render() {
        return (
                <div className="col-xs-12 col-sm-9 mx-auto page-content" id="page-content">

                    <div className="">
                        <div className="row container-fluid d-flex justify-content-center">
                            <div className="col-xs-12 col-sm-9">
                                <div className="card px-3">
                                    <div className="card-title pt-3">
                                        <center><h2 className="title-color blinking">Today's Task Reminder</h2>

                                        </center>

                                    </div>
                                    <div className="card-body">

                                        <form onSubmit={this.createTask}>
                                            <div className="add-items d-flex"><input type="textarea" id="task"
                                                                                     className="form-control todo-list-input"
                                                                                     placeholder="Enter your tasks here"/>
                                                <button
                                                    className="add btn btn-primary font-weight-bold todo-list-add-btn">Add
                                                </button></div>
                                        </form>

                                        <div className="list-wrapper">
                                            <ul className="d-flex flex-column todo-list">
                                                {
                                                    this.state.all_tasks.map((list,index) => {
                                                        var Class = list.completed == true?"completed":""
                                                        return (
                                                            <li className={Class} onClick={() => this.completeUnCompleteTask(list)}>
                                                                <div className="form-check">
                                                                    <label className="form-check-label">
                                                                        {index+1}. {list.title}<i
                                                                                className="input-helper"></i>
                                                                    </label>
                                                                </div>
                                                                <i className="remove mdi mdi-close-circle-outline"  onClick={() => this.deleteTask(list)}></i>
                                                            </li>


                                                        )
                                                    })
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }

}

export default Todo