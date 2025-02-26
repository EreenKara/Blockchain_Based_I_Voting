import {UserOptions} from '@entities/user.entity';

class UserViewModel {
  id?: string;
  username?: string;
  name?: string;
  surname?: string;
  identityNumber?: string;
  email?: string;
  phoneNumber?: string;
  image?: string | null;
  constructor(user: UserOptions) {
    this.id = user.id ?? undefined;
    this.name = user.name ?? undefined;
    this.surname = user.surname ?? undefined;
    this.identityNumber = user.identityNumber ?? undefined;
    this.email = user.email ?? undefined;
    this.phoneNumber = user.phoneNumber ?? undefined;
    this.image = user.image ?? undefined;
  }
}

export default UserViewModel;
