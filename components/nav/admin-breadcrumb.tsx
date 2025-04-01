import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb"

interface AdminBreadcrumbProps {
  items: BreadcrumbItem[]
}

export function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  return (
    <div className="mb-6">
      <Breadcrumb items={items} homeHref="/admin" homeLabel="Admin" />
    </div>
  )
}
