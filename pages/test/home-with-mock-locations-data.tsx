import React, { useEffect } from "react"

// project components
import { HomePage } from "@/components/HomePage"
import { BaseSeo } from "@/components/seo/BaseSeo"

// utils
import { WEBSITE_NAME } from "@/utils/const"

// store
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import {
  getLocations,
  selectLocations,
  setLocations,
} from '@/store/locations/locationsSlice'
// import { getAllLocations } from "@/actions/location"

function App({ locations=[] }) {
  const dispatch = useAppDispatch()
  const {
    data,
    pending,
    error,
  } = useAppSelector(selectLocations)

  useEffect(() => {
    if (
      locations.length === 0 &&
      (!data?.length && !pending)
    ) dispatch(getLocations())
    else dispatch(setLocations(locations))
  }, [])

  return (
    <>
      <BaseSeo
        title={`Купить билеты на автобус, заказать автобусные билеты онлайн`}
        description={`Заказать или купить билет на автобус онлайн на сайте ${WEBSITE_NAME}. Онлайн бронирование билетов на автобусы . Забронировать автобусный билет на сайте ${WEBSITE_NAME}`}
      />
      <HomePage />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { query } = context
  let props = {}

  try {
    const locations = [
      {
        "_id": "62befbc28977522798be3a4f",
        "name": "Алчевск",
        "district": "Луганская",
        "__v": 0
      },
      {
        "_id": "62befa5d8977522798be3a27",
        "name": "Белая Церковь",
        "district": "Киевская",
        "__v": 0
      },
      {
        "_id": "62befb068977522798be3a3b",
        "name": "Бердянск",
        "district": "Запорожская",
        "__v": 0
      },
      {
        "_id": "62c35b80fff7dc0decb9a7ad",
        "name": "Болград",
        "district": "Одесская",
        "__v": 0
      },
      {
        "_id": "62befba98977522798be3a4b",
        "name": "Бровары",
        "district": "Киевская",
        "__v": 0
      },
      {
        "_id": "62c342d273939c3768734f3b",
        "name": "Бухарест",
        "district": "Бухарест",
        "__v": 0
      },
      {
        "_id": "62add900d38e2584e90bd699",
        "name": "Винница",
        "district": "achham",
        "__v": 0
      },
      {
        "_id": "62c3420b73939c3768734f30",
        "name": "Галац",
        "district": "Галац",
        "__v": 0
      },
      {
        "_id": "62bef98e8977522798be3a13",
        "name": "Горловка",
        "district": "Донецкая",
        "__v": 0
      },
      {
        "_id": "62add844d38e2584e90bd681",
        "name": "Днепр",
        "district": "Днепропетровская",
        "__v": 0
      },
      {
        "_id": "62add850d38e2584e90bd685",
        "name": "Донецк",
        "district": "Донецкая",
        "__v": 0
      },
      {
        "_id": "62befb8f8977522798be3a47",
        "name": "Евпатория",
        "district": "Крым",
        "__v": 0
      },
      {
        "_id": "62add97ad38e2584e90bd6b5",
        "name": "Житомир",
        "district": "Житомирская",
        "__v": 0
      },
      {
        "_id": "62add862d38e2584e90bd689",
        "name": "Запорожье",
        "district": "Запорожская",
        "__v": 0
      },
      {
        "_id": "62add9a5d38e2584e90bd6c1",
        "name": "Ивано-Франковск",
        "district": "Ивано-Франковская",
        "__v": 0
      },
      {
        "_id": "62c35bcdfff7dc0decb9a7b3",
        "name": "Измаил",
        "district": "Одесская",
        "__v": 0
      },
      {
        "_id": "62bef9bf8977522798be3a17",
        "name": "Каменское",
        "district": "Днепропетровская",
        "__v": 0
      },
      {
        "_id": "62befabb8977522798be3a33",
        "name": "Керчь",
        "district": "Крым",
        "__v": 0
      },
      {
        "_id": "60269e94c06e5674fb04b35c",
        "name": "Киев",
        "district": "г. Киев",
        "__v": 0
      },
      {
        "_id": "62befa888977522798be3a2b",
        "name": "Краматорск",
        "district": "Донецкая",
        "__v": 0
      },
      {
        "_id": "62befa1e8977522798be3a1f",
        "name": "Кременчуг",
        "district": "Полтавская",
        "__v": 0
      },
      {
        "_id": "62add86fd38e2584e90bd68d",
        "name": "Кривой Рог",
        "district": "Кировоградская",
        "__v": 0
      },
      {
        "_id": "62bef9f08977522798be3a1b",
        "name": "Кропивницкий",
        "district": "Кировоградская",
        "__v": 0
      },
      {
        "_id": "62add8cbd38e2584e90bd695",
        "name": "Луганск",
        "district": "Луганская",
        "__v": 0
      },
      {
        "_id": "62befa3c8977522798be3a23",
        "name": "Луцк",
        "district": "Волынская",
        "__v": 0
      },
      {
        "_id": "60daf3428228e4315e12c1ad",
        "name": "Львов",
        "district": "Львовская",
        "__v": 0
      },
      {
        "_id": "62c3447173939c3768734f42",
        "name": "МАПП Джурджу",
        "district": "Джурджу",
        "__v": 0
      },
      {
        "_id": "62c33f8273939c3768734f24",
        "name": "МАПП Джурджулешть",
        "district": "Кагульский",
        "__v": 0
      },
      {
        "_id": "62c35be8fff7dc0decb9a7b7",
        "name": "МАПП Рени",
        "district": "Одесская",
        "__v": 0
      },
      {
        "_id": "62c35410fff7dc0decb9a777",
        "name": "МАПП Русе",
        "district": "Русенская",
        "__v": 0
      },
      {
        "_id": "62bef9348977522798be3a0f",
        "name": "Макеевка",
        "district": "Донецкая",
        "__v": 0
      },
      {
        "_id": "62bef8e28977522798be3a07",
        "name": "Мариуполь",
        "district": "Донецкая",
        "__v": 0
      },
      {
        "_id": "62befaa98977522798be3a2f",
        "name": "Мелитополь",
        "district": "Запорожская",
        "__v": 0
      },
      {
        "_id": "62add87ad38e2584e90bd691",
        "name": "Николаев",
        "district": "Николаевская",
        "__v": 0
      },
      {
        "_id": "62befb578977522798be3a3f",
        "name": "Никополь",
        "district": "Днепропетровская",
        "__v": 0
      },
      {
        "_id": "60269de9c06e5674fb04b35b",
        "name": "Одесса",
        "district": "Одесская",
        "__v": 0
      },
      {
        "_id": "62befbe28977522798be3a53",
        "name": "Павлоград",
        "district": "Днепропетровская",
        "__v": 0
      },
      {
        "_id": "62add944d38e2584e90bd6a5",
        "name": "Полтава",
        "district": "Полтавская",
        "__v": 0
      },
      {
        "_id": "62add98dd38e2584e90bd6bd",
        "name": "Ровно",
        "district": "Ровенская",
        "__v": 0
      },
      {
        "_id": "62c35424fff7dc0decb9a77b",
        "name": "Русе",
        "district": "Русенская",
        "__v": 0
      },
      {
        "_id": "62befb748977522798be3a43",
        "name": "Славянск",
        "district": "Донецкая",
        "__v": 0
      },
      {
        "_id": "62c3427273939c3768734f36",
        "name": "Слобозия",
        "district": "Яломица",
        "__v": 0
      },
      {
        "_id": "62c3545efff7dc0decb9a781",
        "name": "София",
        "district": "София",
        "__v": 0
      },
      {
        "_id": "62add983d38e2584e90bd6b9",
        "name": "Сумы",
        "district": "Сумская",
        "__v": 0
      },
      {
        "_id": "62c35b57fff7dc0decb9a7a9",
        "name": "Татарбунары",
        "district": "Одесская",
        "__v": 0
      },
      {
        "_id": "62add9c9d38e2584e90bd6c5",
        "name": "Тернополь",
        "district": "Тернопольская",
        "__v": 0
      },
      {
        "_id": "62befae68977522798be3a37",
        "name": "Ужгород",
        "district": "Закарпатская",
        "__v": 0
      },
      {
        "_id": "62add839d38e2584e90bd67d",
        "name": "Харьков",
        "district": "Харьковская",
        "__v": 0
      },
      {
        "_id": "62add926d38e2584e90bd69d",
        "name": "Херсон",
        "district": "Херсонская",
        "__v": 0
      },
      {
        "_id": "62add95dd38e2584e90bd6ad",
        "name": "Хмельницкий",
        "district": "Хмельницкая",
        "__v": 0
      }
    ]
    if (locations) props = {
      ...props,
      locations
    }
  } catch (error) {
    console.error('Home page srr fetching error', { error })
  }

  return {
    props: props
  }
}

export default App
