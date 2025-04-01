import { Icon } from "./icon"

export function LogoLockup() {
  return (
    <div className="flex items-center gap-3">
      <Icon />
      <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-br dark:bg-linear-to-br from-blue-500 via-purple-700 to-indigo-500 dark:from-blue-300 dark:via-purple-500 dark:to-indigo-500">
        party starter
      </span>
    </div>
  )
}
