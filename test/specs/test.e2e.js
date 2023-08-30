/**
 * test with page objects
 */
const ForgotPasswordPage = require("../pageobjects/forgot-password.page");
const ResetPasswordPage = require("../pageobjects/reset-password.page");

const {
  createClient,
  getLinks,
  getMatchingEmails,
  doesInboxHaveEmails,
} = require("../../lib/mailinator");

const { retryWithDelay } = require("../../lib/retry");

let mailinatorClient;

describe("Forgot Password", () => {
  before(async () => {
    mailinatorClient = await createClient();
  });
  it("should use the forgot password flow to reset a password", async () => {
    // TODO: Login to Mailinator directly using values in env:
    // MAILINATOR_ACCOUNT_EMAIL=
    // MAILINATOR_ACCOUNT_PASSWORD=
    const loginToMailinator = true;
    if (loginToMailinator) {
      // goto mailinator login
      // input email and password
      // submit
      // confirm successful
    }
    // End TODO

    // TODO: These values doesn't _need_ to be .env variables,
    // but for testing and security sake for now to not leak mailinator domain, use .env
    const emailDomain = process.env.MAILINATOR_EMAIL_DOMAIN;
    const subject = process.env.MAILINATOR_EMAIL_SUBJECT;
    const now = process.env.MAILINATOR_EMAIL_SUBJECT | Date.now();
    const to = process.env.MAILINATOR_EMAIL_TO;

    const fullEmail = `${to}@${emailDomain}`;

    // TODO: Debugging variables; delete later
    const requestPasswordReset = true;
    const resetPassword = true;
    // End

    await ForgotPasswordPage.open();

    // TODO: Remove this if for the blog post
    if (requestPasswordReset) {
      await ForgotPasswordPage.requestPasswordReset(fullEmail);
      await expect(ForgotPasswordPage.wasRequestSuccessful()).toBe(true);
    }

    // Note: We know we only get one email returned, so pull it out of the array directly
    const [email] = await retryWithDelay(
      getMatchingEmails(mailinatorClient, emailDomain, subject, now, to),
      doesInboxHaveEmails,
      "Inbox did not contain new email that matched"
    );

    // Note: This comes back as a response, rather than a list of links
    const linksResponse = await getLinks(
      mailinatorClient,
      emailDomain,
      to,
      email.id
    );
    console.log(linksResponse.result.links);

    // Notes: If there is more than one link in your email, you will need to search for it
    // In this example, we only get one link, so we grab it directly
    if (resetPassword) {
      await ResetPasswordPage.open(linksResponse.result.links[0]);
      await ResetPasswordPage.resetPassword("newpassword123", true);
      await expect(ResetPasswordPage.wasRequestSuccessful()).toBe(true);
    }
  });
});
