import { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import Row from '../components/Row';

const url = 'http://localhost:3001/'

function Home() {

  const [task, setTask] = useState(''); // task is a string description of a task
  const [tasks, setTasks] = useState([]); // tasks is an array containing all tasks

  useEffect(() => {
    axios.get(url)
    .then(response => {
      setTasks(response.data)
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error : error)
    })
  }, [])

  const addTask = () => {

    axios.post(url + 'create', {
      description: task
    })
    .then (response => {
      setTasks([...tasks, {id: response.data.id, description: task}])
      setTask('')
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error : error)
    })
  }

  const deleteTask = (deleted) => {

    axios.delete(url + 'delete/' + deleted)
      .then(response => {
        const withoutRemoved = tasks.filter((item) => item.id !== deleted)
        setTasks(withoutRemoved)
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }

  return (
    <div id="container">
      <div>

          <h3>Stuff I Need To Do</h3>

          <form>
            <input placeholder="Add new task!" 
            value = {task}
            onChange = {(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTask()
              }
            }}
            />
          </form>

          <ul>
            {
              tasks.map(item => (
                <Row key={item.id} item={item} deleteTask={deleteTask} />
              ))
            }
          </ul>

      </div>
    </div>
  );
}

export default Home;
