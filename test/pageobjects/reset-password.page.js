const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ResetPasswordPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputPassword() {
    return $("#pw1");
  }

  get inputConfirmPassword() {
    return $("#pw2");
  }

  get btnSubmit() {
    return $("button");
  }

  get flashError() {
    return $("#many_send_reset_error");
  }

  // TODO: Get the correct selector for success
  get successfulHeader() {
    return $("h3*=Please check your email");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to enter email and submit forgot password request
   */
  async resetPassword(password, matchPassword = true) {
    await this.inputPassword.setValue(password);

    // If you want the passwords to match, use the same password.
    // Else, use the password and append extra characters
    if (matchPassword) {
      await this.inputConfirmPassword.setValue(password);
    } else {
      await this.inputConfirmPassword.setValue(`${password}123`);
    }

    await this.btnSubmit.click();
    await this.successfulHeader.waitForDisplayed();
  }

  async wasRequestSuccessful() {
    return this.successfulHeader.isDisplayed();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("setyourpw.jsp");
  }
}

module.exports = new ResetPasswordPage();
