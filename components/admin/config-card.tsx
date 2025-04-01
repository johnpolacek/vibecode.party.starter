import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ConfigItem {
  key: string
  description: string
  isMissing?: boolean
}

interface FileToRemove {
  path: string
  description?: string
}

interface ConfigCardProps {
  title: string
  description: string
  configItems: ConfigItem[]
  filesToRemove?: FileToRemove[]
  alternativeTitle?: string
  alternativeDescription?: string
}

export function ConfigCard({
  title,
  description,
  configItems,
  filesToRemove,
  alternativeTitle = "Alternative option",
  alternativeDescription = "If you don't plan to use this feature, you can remove the following files:",
}: ConfigCardProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
        <CardDescription className="text-primary/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            To enable this functionality, you need to configure the following environment variables in your <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">.env</code> file:
          </p>

          <div className="space-y-3 mt-4">
            {configItems.map((item) => (
              <div key={item.key} className="grid grid-cols-2 gap-2 items-start">
                <div className="flex items-center gap-2">
                  {item.isMissing ? <XCircle className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                  <code className={`font-semibold py-1 rounded text-xs font-mono ${item.isMissing ? "text-destructive" : "text-green-500"}`}>{item.key}</code>
                </div>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {filesToRemove && filesToRemove.length > 0 && (
          <Alert className="border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">{alternativeTitle}</AlertTitle>
            <AlertDescription className="text-primary/80">
              {alternativeDescription}
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {filesToRemove.map((file) => (
                  <li key={file.path} className="text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">{file.path}</code>
                    {file.description && <span className="text-primary/70 ml-2">- {file.description}</span>}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
