import { QjcgBusinessPage } from './app.po';

describe('qjcg-business App', function() {
  let page: QjcgBusinessPage;

  beforeEach(() => {
    page = new QjcgBusinessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
