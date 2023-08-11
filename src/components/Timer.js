import React from "react"
import { useNavigate } from "react-router-dom"

export const Timer = (props) => {
    const navigate=useNavigate();
    const { initMinute = 0, initSeconds = 10 } = props
    const [minutes, setMinutes] = React.useState(initMinute)
    const [seconds, setSeconds] = React.useState(initSeconds)
  
    React.useEffect(() => {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } if (seconds === 0) {
          if (minutes === 0) {
            navigate('/')
            clearInterval(myInterval)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      }, 1000)
      return () => {
        clearInterval(myInterval)
      }
    })
  
    return (
      <React.Fragment>
              <div className='wrapper'>
                  { minutes === 0 && seconds === 0 ? (
                      <React.Fragment>
                          <div className="text-yellow-500">Session Timed Out!!</div>
                      </React.Fragment>
                  ) : (
                      <React.Fragment>
                          <div className="text-yellow-500">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                      </React.Fragment>
                  )}
              </div>
      </React.Fragment>
    )
  }