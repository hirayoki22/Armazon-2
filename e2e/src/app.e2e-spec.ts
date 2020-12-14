import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome!');
  });

  it('should have aria label logo ', () => {
    page.navigateTo();
    expect(page.getLogo()).toEqual('Armazon logo');
  });
  
  it('should navigate to user/login ', () => {
    page.navigateTo();
    page.getLoginButton().click();
    expect(page.getUserLoginPage()).toEqual('Log in to your Armazon account');
  });
  
  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
