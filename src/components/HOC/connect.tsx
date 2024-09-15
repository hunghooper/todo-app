import React from 'react'
import { log, debug } from '../constans'

interface ExtraTypes {
  log: (text: any) => void
  debug: boolean
}

export default function connect<T>(Component: React.ComponentType<T & ExtraTypes>) {
  return function (props: Omit<T, keyof ExtraTypes>) {
    return <Component {...(props as T)} log={log} debug={debug} />
  }
}