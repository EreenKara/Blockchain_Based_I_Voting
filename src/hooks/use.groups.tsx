import GroupViewModel from '@viewmodels/group.viewmodel';
import UserViewModel from '@viewmodels/user.viewmodel';
import {useContext, useState} from 'react';
import {useEffect} from 'react';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import {ServiceType} from '@services/backend/concrete/service.container';
import UserService from '@services/backend/concrete/user.service';

export const useGroups = () => {
  const userService = ServiceContainer.getService(
    ServiceType.UserService,
  ) as UserService;
  const [groups, setGroups] = useState<GroupViewModel[]>([]);
  const [group, setGroup] = useState<GroupViewModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async (userId: string) => {
    try {
      setLoading(true);
      const groups = await userService.getGroupsByUserId(userId);
      setGroups(groups);
    } catch (error) {
      setError('Grupların yüklenmesi sırasında bir hata oluştu. API HATASI.');
    } finally {
      setLoading(false);
    }
  };
  const fetchGroup = async (groupId: string) => {
    try {
      setLoading(true);
      const group = await userService.getGroupById(groupId);
      const filteredGroup = groups.find(g => g.id === group.id);
      if (filteredGroup) {
        filteredGroup.users = group.users;
      }
      setGroup(group);
    } catch (error) {
      setError('Grup yüklenirken bir hata oluştu. API HATASI.');
    } finally {
      setLoading(false);
    }
  };

  return {
    groups,
    group,
    fetchGroups,
    fetchGroup,
    loading,
    error,
  };
};
