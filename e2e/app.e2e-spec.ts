import { ParkingManagementPage } from './app.po';

describe('parking-management App', () => {
  let page: ParkingManagementPage;

  beforeEach(() => {
    page = new ParkingManagementPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
