import React from 'react'
import date from 'date-and-time';

const now = new Date();

const testing = () => {
  return (
    <>
        <div>{date.format(now, 'MM/DD/YYYYHH:mm:ss:A')}</div>
        <div>{date.format(now, 'HH:mm:ss:A')}</div>

    </>
  )
}

export default testing