import {User} from '../model/User';
import {makeAutoObservable, runInAction} from 'mobx';
import {Storage} from '../core/Storage';

export class AccountStore {
  loginDto!: User;
  /**
   * For authentication purpose
   * only use this userData
   */
  userData: User | null = null;

  constructor() {
    console.log(JSON.stringify(this.loginDto?.token));
    makeAutoObservable(this);
  }

  get user(): User | null {
    return this.userData;
  }

  set setUserData(userData: User) {
    this.userData = userData;
  }

  async loginAgain() {
    let loginDtoFromStore = await Storage.getItemAsync(Storage.keys.loginDto);
    console.log('LOGIN_DTO_FROM_STORE', loginDtoFromStore);
    runInAction(() => {
      if (loginDtoFromStore) {
        this.setUserData = new User(JSON.parse(loginDtoFromStore).dto.data);
      }
    });
  }

  async login(loginDto: User) {
    await Storage.setItemAsync(Storage.keys.loginDto, JSON.stringify(loginDto));
    runInAction(() => {
      if (loginDto) {
        this.loginDto = loginDto;
        console.log('LOGIN', loginDto);
      }
    });
  }

  isLogin(): boolean {
    if (this.user != null) {
      return this.user?.token !== '';
    }
    return false;
  }

  logout(): void {
    this.setUserData = new User({
      user_fcm_token: '',
      user_name: '',
      user_token: '',
      user_phone_no: '',
      user_registered: 0,
    });
  }
}
export const accountStore = new AccountStore();
