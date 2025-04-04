import { Heading } from "@/components/typography/heading"
import { UploadDemoClient } from "@/components/demo/upload-demo-client"
import { ConfigCard } from "@/components/admin/config-card"

const requiredEnvVars = {
  AWS_KEY: "Your AWS access key ID for S3 access",
  AWS_SECRET: "Your AWS secret access key for S3 access",
  AWS_REGION: "The AWS region where your S3 bucket is located (e.g., us-east-1)",
  AWS_BUCKET_PUBLIC: "The name of your public S3 bucket for file uploads",
}

export default async function UploadDemo() {
  // Check for missing environment variables
  const missingEnvVars = Object.entries(requiredEnvVars).map(([key, description]) => ({
    key,
    description,
    isMissing: !process.env[key],
  }))

  const hasAllEnvVars = missingEnvVars.every((item) => !item.isMissing)

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Upload Demo</span>
        <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
          File Upload <span className="text-primary">System</span>
        </Heading>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Try out our drag-and-drop file upload system with AWS S3 integration and image optimization.</p>
      </div>

      <div className="mx-auto max-w-2xl mt-12">
        {!hasAllEnvVars ? (
          <ConfigCard
            title="AWS S3 Configuration Required"
            description="To enable file uploads, you need to configure AWS S3 credentials and settings."
            configItems={missingEnvVars}
            filesToRemove={[
              { path: "components/ui/image-upload.tsx", description: "Image upload component" },
              { path: "lib/s3-utils.ts", description: "S3 utility functions" },
            ]}
            alternativeTitle="Remove File Upload Feature"
            alternativeDescription="If you don't plan to use AWS S3 for file uploads, you can remove these files:"
          />
        ) : (
          <UploadDemoClient />
        )}
      </div>
    </div>
  )
}
