import { useEffect, useState } from 'react'
import styles from './taskInput.module.scss'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype'
import connect from '../HOC/connect'

interface TaskInputProps {
  handleAddTodo: (name: string, isDone: boolean) => void
  currentTodo: Todo | null
  updateTodo: (id: string, name: string) => void
}

function TaskInput(props: TaskInputProps) {
  const { handleAddTodo, currentTodo, updateTodo } = props
  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (currentTodo) {
      const { name } = currentTodo
      setName(name)
    }
  }, [currentTodo])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      updateTodo(currentTodo.id, name)
    } else if (name) {
      handleAddTodo(name, false)
    }
    setName('')
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list</h1>
      <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
        <input type='text' placeholder='caption goes here...' value={name} onChange={(event) => handleChange(event)} />
        <button type='submit'>{currentTodo ? '✏️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}

export default connect<TaskInputProps>(TaskInput)
