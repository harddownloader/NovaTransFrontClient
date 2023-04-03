import React, { ReactElement } from "react"
import { CommonLayout } from "@/components/Layouts"

// assets
import classes from '@/styles/InfoPage.module.scss'

export const TransportationRulesPage = () => {
  return (
    <>
      <div className={classes.content_wrapper}>
        <h1 className={classes.heading}>Возврат билетов</h1>
      </div>
    </>
  )
}

TransportationRulesPage.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default TransportationRulesPage
