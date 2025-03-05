import { container } from './container';
import { UserRepositoryPrisma } from '../database/repository/user.repository.prisma';
import { UserServiceImpl } from '../../application/user/user.service.impl';

const userRepository = new UserRepositoryPrisma();
const userService = new UserServiceImpl(userRepository);

container.register('UserService', userService);