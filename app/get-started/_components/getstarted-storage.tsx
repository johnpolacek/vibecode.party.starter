import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard"
import { Heading } from "@/components/typography/heading"

export default async function GetStartedStorage() {
  // Check for AWS configuration
  const hasRequiredConfig = process.env.AWS_KEY && process.env.AWS_SECRET && process.env.AWS_REGION && process.env.AWS_BUCKET_PUBLIC

  const hasCloudFront = process.env.CLOUDFRONT_DOMAIN

  const cursorPrompt = `Please help me remove AWS S3 file storage from my project by:

1. Deleting these files:
   - lib/aws.ts
   - lib/s3-utils.ts
   - lib/upload-utils.ts
   - app/api/upload/route.ts

2. Removing this dependency from package.json:
   - @aws-sdk/client-s3

3. Removing these environment variables from .env:
   - AWS_KEY
   - AWS_SECRET
   - AWS_REGION
   - AWS_BUCKET_PUBLIC
   - CLOUDFRONT_DOMAIN

4. Updating next.config.ts by removing *.s3.amazonaws.com entries from images.remotePatterns

After these changes, please run \`pnpm install\` to update the dependency tree.`

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <Card className="p-8 mt-8 w-full">
        <div className="flex justify-between items-start">
          <div>
            <Heading variant="h4" className="text-primary">
              File Storage (AWS S3)
            </Heading>
            <p className="text-sm text-muted-foreground">Optional: Set up file storage for handling uploads in your application</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {!hasRequiredConfig ? (
            <>
              <div className="space-y-4">
                <p>To set up file storage with AWS S3:</p>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    Create an AWS account and access the{" "}
                    <a href="https://aws.amazon.com/console/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      AWS Console
                    </a>
                  </li>
                  <li>Create an S3 bucket for public files and configure CORS settings</li>
                  <li>Create an IAM user with appropriate S3 permissions and get the access credentials</li>
                  <li>
                    Create or update your <code className="px-2 py-1 bg-muted rounded">.env</code> file with the following variables:
                    <pre className="mt-2 p-4 bg-muted rounded-md max-w-xl overflow-x-auto">
                      <code>
                        AWS_KEY=your_access_key_id{"\n"}
                        AWS_SECRET=your_secret_access_key{"\n"}
                        AWS_REGION=your_bucket_region{"\n"}
                        AWS_BUCKET_PUBLIC=your_bucket_name{"\n"}
                        CLOUDFRONT_DOMAIN=your_cloudfront_domain # Optional but recommended
                      </code>
                    </pre>
                  </li>
                  <li>Restart your development server after adding the environment variables</li>
                </ol>
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-amber-50 rounded-md">
                    <p className="text-amber-800 text-sm">
                      <strong>Security Note:</strong> Ensure your AWS credentials have the minimum required permissions and are never committed to version control.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-md">
                    <p className="text-blue-800 text-sm">
                      <strong>CloudFront Recommendation:</strong> While optional, setting up CloudFront is recommended for better performance and caching of your stored files.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-8">
                <Heading variant="h5">Don't need file storage?</Heading>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2 relative">
                    <h4 className="font-semibold text-primary">Cursor Prompt</h4>
                    <div className="absolute -top-4 -right-4 w-full">
                      <CopyToClipboard position="top-right" hideContent={true}>
                        {cursorPrompt}
                      </CopyToClipboard>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground -mt-2 mb-4">Copy this prompt and paste it to Cursor to automatically remove file storage:</p>
                  <pre className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
                    <code>{cursorPrompt}</code>
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">
                ✓ File Storage is properly configured!
                {!hasCloudFront && <span className="text-amber-500 text-sm ml-2">(CloudFront recommended)</span>}
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-left">
                  <p className="mb-4">Your file storage system is ready to use. You can now:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Upload files to S3</li>
                    <li>Generate pre-signed URLs for secure file access</li>
                    <li>Manage public and private files</li>
                    <li>Handle file uploads in your application</li>
                  </ul>
                  {!hasCloudFront && (
                    <div className="mt-6 p-4 bg-amber-50 rounded-md">
                      <p className="text-amber-800 text-sm">
                        <strong>Recommendation:</strong> Consider setting up CloudFront for improved performance and caching. Add the{" "}
                        <code className="px-1 py-0.5 bg-amber-100 rounded">CLOUDFRONT_DOMAIN</code> variable to your environment configuration.
                      </p>
                    </div>
                  )}
                  <div className="mt-6 p-4 bg-blue-50 rounded-md">
                    <p className="text-blue-800 text-sm">
                      <strong>Tip:</strong> You can manage your S3 buckets and CloudFront distributions in the{" "}
                      <a href="https://aws.amazon.com/console/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        AWS Console
                      </a>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </Card>
    </div>
  )
}
