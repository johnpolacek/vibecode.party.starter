export const categories = {
  ai: "AI",
  business: "Business",
  community: "Community",
  data: "Data",
  design: "Design",
  ecommerce: "Ecommerce",
  education: "Education",
  entertainment: "Entertainment",
  game: "Game",
  mobile: "Mobile App",
  productivity: "Productivity",
  saas: "SaaS",
  ui: "UI Library",
  xr: "AR/VR/XR",
  other: "Other",
};

export function getCategoryLabel(categoryKey: string): string {
  return categories[categoryKey as keyof typeof categories] || categoryKey;
}

export function getCategoryColor(categoryKey: string): string {
  const colorMap: Record<string, string> = {
    ai: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    web: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    mobile: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    game: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    data: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    blockchain: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    iot: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    ar: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    design: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
    accessibility: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    sustainability: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    education: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    health: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
    social: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

  return colorMap[categoryKey] || colorMap.other;
} 