const {
  GetInboxRequest,
  GetLinksRequest,
  MailinatorClient,
} = require("mailinator-client");

/**
 * @returns An instantiated MailinatorClient using the environment variable `MAILINATOR_API_KEY`
 */
const createClient = async () =>
  new MailinatorClient(process.env.MAILINATOR_API_KEY);

const getInbox = async (mailinatorClient, emailDomain) =>
  mailinatorClient.request(new GetInboxRequest(emailDomain));

/**
 *
 * @param {MailinatorClient} mailinatorClient - The Mailinator client used to fetch emails.
 * @param {string} emailDomain - The email domain to fetch emails from. This would be everything after the `@` in an email address.
 * @param {string} inbox - The recipient to match against. This would be everything before the `@` in an email address.
 * @param {string} messageId - The message id of the email that gets returned in the GetInboxRequest request. Property `result.msgs[0].id`
 * @returns {object} A response object from the request that, if the email exists, should contain a `result.links[]` array with all the links found in the email.
 */
const getLinks = async (mailinatorClient, emailDomain, inbox, messageId) =>
  mailinatorClient.request(new GetLinksRequest(emailDomain, inbox, messageId));

const getMatchingEmailsFromInbox = (subject, now, to, inbox) =>
  inbox.result.msgs.filter(
    (msg) => msg.subject === subject && msg.time > now && msg.to === to
  );

/**
 * Get a function that fetches matching emails from the specified email domain's inbox.
 *
 * @param {MailinatorClient} mailinatorClient - The Mailinator client used to fetch emails.
 * @param {string} emailDomain - The email domain to fetch emails from. This would be everything after the `@` in an email address.
 * @param {string} subject - The subject of the emails to match against.
 * @param {Date} now - The epoch timestamp to check emails against (e.g. `Date.now()`). If the email timestamp is after this time, it is a candidate.
 * @param {string} to - The recipient to match against. This would be everything before the `@` in an email address.
 * @returns {Promise<any>} An async function that, when invoked, returns a Promise that resolves with an array of matching emails
 *                     from the specified email domain's inbox. The returned function performs the actual email retrieval.
 */
const getMatchingEmails =
  (mailinatorClient, emailDomain, subject, now, to) => async () =>
    getInbox(mailinatorClient, emailDomain).then((inbox) =>
      getMatchingEmailsFromInbox(subject, now, to, inbox)
    );

/**
 * Check if the list of emails has one or more entries.
 *
 * @param {string[]} msgs - An array of emails
 * @returns Whether the list of emails has a length greater than zero
 */
const doesInboxHaveEmails = (msgs) => msgs.length > 0;

module.exports = {
  createClient,
  getMatchingEmails,
  getLinks,
  doesInboxHaveEmails,
};
