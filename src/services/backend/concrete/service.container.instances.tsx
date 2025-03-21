import {ServiceContainer, ServiceType} from './service.container';
import {ElectionService} from './election.service';
import {UserService} from './user.service';

export const electionService = ServiceContainer.getService(
  ServiceType.ElectionService,
) as ElectionService;

export const userService = ServiceContainer.getService(
  ServiceType.UserService,
) as UserService;
