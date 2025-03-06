import {useState, useEffect} from 'react';
import UserService from '@services/backend/concrete/user.service';
import {
  ServiceContainer,
  ServiceType,
} from '@services/backend/concrete/service.container';
import GroupViewModel from '@viewmodels/group.viewmodel';

export default function useGroups() {
  const userService = ServiceContainer.getService(
    ServiceType.UserService,
  ) as UserService;
  const [groups, setGroups] = useState<GroupViewModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async (userId: string) => {
    try {
      setLoading(true);
      const fetchedGroups = await userService.getGroupsByUserId(userId);
      setGroups(fetchedGroups);
    } catch (err) {
      setError('Grupların yüklenmesi sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return {groups, fetchGroups, loading, error};
}
