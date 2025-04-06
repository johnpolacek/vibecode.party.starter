export function ContactFormPreview() {
  return (
    <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-primary/20 shadow-xl w-full sm:w-96 max-w-md pt-6 px-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-primary/20 rounded"></div>
          <div className="h-8 w-full bg-muted rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-primary/20 rounded"></div>
          <div className="h-8 w-full bg-muted rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-primary/20 rounded"></div>
          <div className="h-24 w-full bg-muted rounded"></div>
        </div>
        <div className="flex justify-end">
          <div className="h-10 w-28 bg-primary/70 rounded"></div>
        </div>
        <div className="h-4 w-full bg-muted/50 rounded"></div>
      </div>
    </div>
  )
}

export function AuthFlowPreview() {
  return (
    <div className="grid grid-cols-2 gap-4 relative z-10 w-full max-w-md">
      <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-secondary/20 shadow-xl p-4 flex flex-col items-center justify-center aspect-[4/5]">
        <div className="w-12 h-12 rounded-full bg-secondary/20 mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-secondary">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
        </div>
        <div className="h-4 w-16 bg-fuchsia-100 rounded mb-2"></div>
        <div className="h-8 w-full bg-fuchsia-100 rounded mb-2"></div>
        <div className="h-8 w-full bg-fuchsia-100 rounded mb-4"></div>
        <div className="h-8 w-full bg-fuchsia-100 rounded"></div>
      </div>
      <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-secondary/20 shadow-xl p-4 flex flex-col items-center justify-center aspect-[4/5]">
        <div className="w-12 h-12 rounded-full bg-secondary/20 mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-secondary">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div className="h-4 w-16 bg-fuchsia-100 rounded mb-2"></div>
        <div className="h-16 w-16 rounded-full bg-fuchsia-100 mb-4"></div>
        <div className="h-4 w-24 bg-fuchsia-100 rounded mb-2"></div>
        <div className="h-4 w-20 bg-fuchsia-100 rounded"></div>
      </div>
    </div>
  )
}
