import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root h2')).getText() as Promise<string>;
  }

  getLogo(): Promise<string> {
    return element(by.css('app-root app-navbar .logo')).getAttribute('aria-label') as Promise<string>;
  }

  getLoginButton() {
    return element(by.css('app-navbar .login-btn'));
  }

  getUserLoginPage() {
    return element(by.css('app-login-page .middle-content h3')).getText() as Promise<string>;
  }
}
