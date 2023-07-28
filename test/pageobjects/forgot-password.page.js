const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ForgotPasswordPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputEmail() {
    return $("#many_send_reset_email");
  }

  get btnSubmit() {
    return $("button");
  }

  get checkEmailHeader() {
    return $("h3*=Please check your email");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to enter email and submit forgot password request
   */
  async requestPasswordReset(email) {
    await browser.debug();
    await this.inputEmail.setValue(email);
    await this.btnSubmit.click();
    await this.checkEmailHeader.waitForDisplayed();
  }

  async wasRequestSuccessful() {
    return this.checkEmailHeader.isDisplayed();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("testreset.jsp");
  }
}

module.exports = new ForgotPasswordPage();
