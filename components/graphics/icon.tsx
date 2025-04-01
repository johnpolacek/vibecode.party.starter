import { SparklesIcon } from "@heroicons/react/24/solid"

export function Icon() {
  return (
    <span className="inline-flex flex-col items-center text-fuchsia-600 dark:text-fuchsia-500 select-none">
      <SparklesIcon className="w-3.5 h-3.5 -mb-2.5 relative" />
      <span className="scale-x-200 text-lg font-medium">V</span>
    </span>
  )
}
