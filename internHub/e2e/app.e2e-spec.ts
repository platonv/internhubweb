import { InternHubPage } from './app.po';

describe('intern-hub App', () => {
  let page: InternHubPage;

  beforeEach(() => {
    page = new InternHubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
