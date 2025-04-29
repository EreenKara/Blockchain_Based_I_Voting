import {ServiceContainer, ServiceType} from './service.container';
import {ElectionService} from './election.service';
import {UserService} from './user.service';
import GroupService from './group.service';
import UserAddressService from './user.address.service';

export const electionService = ServiceContainer.getService(
  ServiceType.ElectionService,
) as ElectionService;

export const userService = ServiceContainer.getService(
  ServiceType.UserService,
) as UserService;

export const groupService = ServiceContainer.getService(
  ServiceType.GroupService,
) as GroupService;

export const userAddressService = ServiceContainer.getService(
  ServiceType.UserAddressService,
) as UserAddressService;
