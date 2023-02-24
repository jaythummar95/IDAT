import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  static keys = Object.freeze({
    loginDto: 'loginDto',
    firstLaunch: 'firstLaunch',
    language: 'language',
    isOnBoarded: 'isOnBoarded',
    fcmToken: 'fcmToken',
    country: 'country',
    state: 'state',
    city: 'city',
    region: 'region',
    group: 'group',
    cmsDto: 'cmsDto',
  });
  static async setItemAsync(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  static async getItemAsync(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  static async existAsync(key: string): Promise<boolean> {
    const value = await AsyncStorage.getItem(key);
    return !!value;
  }

  static async deleteItemAsync(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  static async logout(): Promise<void> {
    const result = await this.getItemAsync(this.keys.firstLaunch);
    await AsyncStorage.clear();
    await this.setItemAsync(this.keys.firstLaunch, result ?? 'false');
  }
}
