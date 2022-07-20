export class UserInfo {
  constructor({ titleSelector, jobSelector, avatarSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo = () => {
    return {
      title: this._titleElement.textContent,
      info: this._jobElement.textContent,
    }
  }

  setUserInfo = ({name, about, avatar, _id}) => {
    this._titleElement.textContent = name;
    this._jobElement.textContent = about;
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
    this._id = _id;
    this._avatar = avatar;
  }

  getUserAvatar() {
    return {
      avatar: this._avatar,
    }
  }

  getUserId() {
    return this._id;
  }
}
