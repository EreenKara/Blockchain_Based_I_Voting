export interface UserViewModel {
  id: string;
  username: string;
  name: string;
  surname: string;
  identityNumber: string;
  email: string;
  phoneNumber: string;
  image: string | null;
}

export default UserViewModel;
