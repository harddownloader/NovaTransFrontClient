import React, { ReactElement } from "react"
import { CommonLayout } from "@/components/Layouts"

// assets
import classes from '@/styles/InfoPage.module.scss'

export const TransportationRulesPage = () => {
  return (
    <>
      <div className={classes.content_wrapper}>
        <h1 className={classes.heading}>Возврат билетов</h1>
        <p>Возврат средств за билеты осуществляется по установленным перевозчиком условиям. Пассажир дал свое согласие на эти условия при покупке билета.</p>
        <br/>
        <p><b>Правила возврата:</b></p>
        <p>1. Более 72 часов до даты рейса – возврат 90% стоимости билета;</p>
        <p>2. От 72 До 24 часов – 70% стоимости;</p>
        <p>3. От 24 До 12 часов – 50% стоимости;</p>
        <p>Меньше 12 часов – без возмещения.</p>
        <br/>
        <p>Возврат производится в течение 14 рабочих дней.</p>
      </div>
    </>
  )
}

TransportationRulesPage.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default TransportationRulesPage
