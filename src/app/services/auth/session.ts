import { UserFromLocalStorage } from "./user-model";

export class UserInLocalStorage {
  token?: string;
  user?: UserFromLocalStorage;
  isLoggedIn: boolean = false;
}
