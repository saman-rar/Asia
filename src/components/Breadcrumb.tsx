import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'

interface BreadcrumbProps {
  links: {
    title: string
    href: string
  }[]
}

const MyBreadcrumb = ({ links }: BreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, i) => (
          <React.Fragment key={i}>
            <BreadcrumbItem>
              <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {links.length - 1 !== i && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default MyBreadcrumb
