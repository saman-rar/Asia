'use client'

import { useState } from 'react'

const MobileTimer = () => {
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [hour, setHour] = useState(0)

  setTimeout(() => {
    setSecond((prev) => prev + 1)
  }, 10000)

  return <div>{second}</div>
}
export default MobileTimer
