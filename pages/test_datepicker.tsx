'use client'
import React from 'react'
import dynamic from "next/dynamic"
const MaterialUIPickers = dynamic(() => import("@/components/Pickers/DatePicker"))

function TestDatepicker(props) {
  return (
    <div>
      <MaterialUIPickers
        value={new Date()}
        minDate={new Date()}
        onChangeDate={() => {}}
        classNames={``}
        classNamesInputIconWrap={''}
        classNamesInputIcon={''}
        isLastElementInRow
      />
    </div>
  )
}

export default TestDatepicker
