export class UserInfo {
  constructor(profileConfig) {
    this._titleSelector = profileConfig.titleSelector;
    this._jobSelector = profileConfig.jobSelector;
    this._titleElement = document.querySelector(`.${this._titleSelector}`);
    this._jobElement = document.querySelector(`.${this._jobSelector}`);
    this._profile = {title: '', info: ''};
  }

  _renderProfile = () => {
    this._titleElement.textContent = this._profile.title;
    this._jobElement.textContent = this._profile.info;
  }

  setUserInfo = (data) => {
    this._profile.title = data.title || '';
    this._profile.info = data.info || '';
    this._renderProfile();
  }

  getUserInfo = () => {
    return this._profile;
  }
}
