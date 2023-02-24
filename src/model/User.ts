import {UserDto} from '../api/DTOs/UserDto';
import {Model} from './core/model';

export class User extends Model<UserDto> {
  constructor(dto: UserDto) {
    super(dto);
  }

  get token(): string {
    return this.dto?.user_token ?? '';
  }
  get userName(): string {
    return this.dto?.user_name ?? '';
  }

  get userPhoneNo(): string {
    return this.dto.user_phone_no ?? 0;
  }

  get registered(): number {
    return this.dto?.user_registered ?? 0;
  }
  get fcm(): string {
    return this.dto.user_fcm_token ?? '';
  }
}
