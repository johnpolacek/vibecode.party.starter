export async function verifyCaptcha(captchaToken: string) {
  "use server";

  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
  });

  const captchaValidation = await response.json();
  if (captchaValidation.success) {
    return true;
  } else {
    throw new Error("reCAPTCHA validation failed");
  }
}