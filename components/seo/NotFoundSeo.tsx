import React from 'react'
import { NextSeo } from "next-seo"

import { PATH_TO_LOGO, WEBSITE_NAME } from "@/utils/const"

export function NotFoundSeo() {
  const title = `Страница не найдена - ${WEBSITE_NAME}`
  const description = "Страница не найдена."

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [
          {
            url: PATH_TO_LOGO,
            alt: title,
          },
        ],
        site_name: WEBSITE_NAME,
      }}
    />
  )
}
