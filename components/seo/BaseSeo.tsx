import React from "react"
import { NextSeo } from "next-seo"

import { PATH_TO_LOGO, WEBSITE_NAME } from "@/utils/const"

interface BaseSeoProps {
  title?: string;
  description?: string;
}

export function BaseSeo({ title, description }: BaseSeoProps) {
  const seoTitle = title ? `${title} - ${WEBSITE_NAME}` : WEBSITE_NAME
  const seoDescription = description || ""

  return (
    <NextSeo
      title={seoTitle}
      description={seoDescription}
      openGraph={{
        title: seoTitle,
        description: seoDescription,
        images: [
          {
            url: PATH_TO_LOGO,
            alt: seoTitle,
          },
        ],
        site_name: WEBSITE_NAME,
      }}
    />
  )
}

