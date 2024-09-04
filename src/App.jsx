import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      completedTasks: [],
      newTask: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  addTask = () => {
    const { newTask, tasks } = this.state;
    if (newTask.trim()) {
      this.setState({
        tasks: [...tasks, newTask],
        newTask: "",
      });
    }
  };

  completeTask = (index) => {
    const { tasks, completedTasks } = this.state;
    const taskToComplete = tasks[index];
    this.setState({
      tasks: tasks.filter((_, i) => i !== index),
      completedTasks: [...completedTasks, taskToComplete],
    });
  };

  deleteTask = (index) => {
    const { completedTasks } = this.state;
    this.setState({
      completedTasks: completedTasks.filter((_, i) => i !== index),
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.tasks !== nextState.tasks ||
      this.state.completedTasks !== nextState.completedTasks ||
      this.state.newTask !== nextState.newTask
    );
  }

  render() {
    const { tasks, completedTasks, newTask } = this.state;

    return (
      <div className="app">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={this.handleInputChange}
          />
          <button onClick={this.addTask}>Add</button>
        </div>
        <div className="task-lists">
          <div className="tasks">
            <h2>Done</h2>
            <ul>
              {tasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  onClick={() => this.completeTask(index)}
                  buttonText="done"
                />
              ))}
            </ul>
          </div>
          <div className="completed-tasks">
            <h2>To do</h2>
            <ul>
              {completedTasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  onClick={() => this.deleteTask(index)}
                  buttonText="Delete"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class Task extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.task !== nextProps.task ||
      this.props.buttonText !== nextProps.buttonText
    );
  }

  render() {
    const { task, onClick, buttonText } = this.props;
    return (
      <li>
        {task}
        <button onClick={onClick}>{buttonText}</button>
      </li>
    );
  }
}

export default App;
