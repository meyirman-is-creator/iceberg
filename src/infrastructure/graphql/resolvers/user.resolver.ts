import { container } from "../../di/container";
import { IUserService } from "../../../domain/user/user.service";
export const userResolver = {
  async register({ name, email, password }: any) {
    const userService = container.resolve<IUserService>("UserService");
    return userService.registerUser(name, email, password);
  },

  async login({ email, password }: any) {
    const userService = container.resolve<IUserService>("UserService");
    return userService.login(email, password);
  },

  async me({ userId }: any) {
    const userService = container.resolve<IUserService>("UserService");
    return userService.getCurrentUser(userId);
  },
};
