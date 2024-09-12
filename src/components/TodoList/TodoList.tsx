import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

const syncReactToLocal = (newTodoList: Todo[]) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = newTodoList
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodoList(todosObj)
  }, [])

  const addTodo = (name: string, isDone: boolean) => {
    const todo: Todo = {
      name,
      done: isDone,
      id: new Date().toISOString()
    }
    setTodoList((prev) => [...prev, todo])
    syncReactToLocal([...todoList, todo])
  }

  const handleCheck = (id: string) => {
    console.log('handleCheck')
    const checkedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done
        }
      }
      return todo
    })
    setTodoList(checkedTodoList)
  }

  const startUpdateTodo = (id: string) => {
    const todo = todoList.find((todo) => todo.id === id)
    if (todo) {
      setCurrentTodo(todo)
    }
  }

  const updateTodo = (id: string, name: string) => {
    console.log('currentTodo: ', currentTodo)
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.name = name
      }
      return todo
    })
    setTodoList(updatedTodoList)
    setCurrentTodo(null)
    syncReactToLocal(updatedTodoList)
  }

  const removeTodo = (id: string) => {
    const removedTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(removedTodoList)
    syncReactToLocal(removedTodoList)
  }

  const doneTaskList = todoList.filter((task) => task.done)
  const notDoneTaskList = todoList.filter((task) => !task.done)
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        TodoList
        <TaskInput handleAddTodo={addTodo} currentTodo={currentTodo} updateTodo={updateTodo} />
        <TaskList
          todoList={notDoneTaskList}
          handleCheck={handleCheck}
          startUpdateTodo={startUpdateTodo}
          removeTodo={removeTodo}
        >
          Chua Hoan Thanh
        </TaskList>
        <TaskList
          todoList={doneTaskList}
          handleCheck={handleCheck}
          startUpdateTodo={startUpdateTodo}
          removeTodo={removeTodo}
        >
          Hoan Thanh
        </TaskList>
      </div>
    </div>
  )
}
