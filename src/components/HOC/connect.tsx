import React from 'react'
import { log, debug } from '../constans'

interface ExtraTypes {
  log: (text: any) => void
  debug: boolean
}

export default function connect<T>(Component: React.ComponentType<T & ExtraTypes>) {
  return (props: T) => <Component {...props} log={log} debug={debug} />
}
