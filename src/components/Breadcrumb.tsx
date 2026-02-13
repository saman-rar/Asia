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
          <>
            <BreadcrumbItem key={i}>
              <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {links.length - 1 !== i && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default MyBreadcrumb
