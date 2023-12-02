import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default function AlertC({variant,msg}) {
  return (
    <div className='alert-container'>
      <Alert variant={variant}>
        {msg}
      </Alert>
    </div>
  )
}
