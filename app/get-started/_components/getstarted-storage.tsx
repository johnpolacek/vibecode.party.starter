import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default async function GetStartedStorage() {
  // Check for AWS configuration
  const hasRequiredConfig = process.env.AWS_KEY && process.env.AWS_SECRET && process.env.AWS_REGION && process.env.AWS_BUCKET_PUBLIC

  const hasCloudFront = process.env.CLOUDFRONT_DOMAIN

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      {!hasRequiredConfig ? (
        <Card className="py-2 px-8 mt-8 w-full">
          <h3 className="text-xl font-semibold">Setup Required: File Storage (AWS S3)</h3>
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
        </Card>
      ) : (
        <Card className="py-2 px-8 mt-8 mx-auto text-center max-w-2xl w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-green-600 font-semibold">
                ✓ S3 File Storage is properly configured!
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
          </Accordion>
        </Card>
      )}
    </div>
  )
}
