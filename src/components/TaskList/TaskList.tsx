import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype'
import styles from './taskList.module.scss'
import PropTypes from 'prop-types'

interface TaskListProps {
  children: string
  todoList: Todo[]
  handleCheck: (id: string) => void
  startUpdateTodo: (id: string) => void
  removeTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { todoList, handleCheck, children, startUpdateTodo, removeTodo } = props

  const handleCheckEvent = (id: string) => () => {
    handleCheck(id)
  }

  const handleStartUpdateTodo = (id: string) => () => {
    startUpdateTodo(id)
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{children}</h2>
      {todoList &&
        todoList.map((todo) => (
          <div className={styles.tasks} key={todo.id}>
            <div className={styles.task}>
              <input
                type='checkbox'
                className={styles.taskCheckbox}
                onChange={handleCheckEvent(todo.id)}
                checked={todo.done}
              />
              <span className={`${styles.taskName} ${!todo.done && styles.taskNameDone}`}>{todo.name}</span>
              <div className={styles.taskActions}>
                <button className={styles.taskBtn} onClick={handleStartUpdateTodo(todo.id)}>
                  🖊
                </button>
                <button className={styles.taskBtn} onClick={() => removeTodo(todo.id)}>
                  🗑
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

TaskList.propTypes = {
  children: PropTypes.string,
  todoList: PropTypes.arrayOf(TodoTypes),
  handleCheck: PropTypes.func,
  startUpdateTodo: PropTypes.func,
  removeTodo: PropTypes.func
}
