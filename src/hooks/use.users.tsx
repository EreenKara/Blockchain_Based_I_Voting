import {useState, useEffect} from 'react';
import UserService from '@services/backend/concrete/user.service';
import {
  ServiceContainer,
  ServiceType,
} from '@services/backend/concrete/service.container';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';

export default function useUsers() {
  const userService = ServiceContainer.getService(
    ServiceType.UserService,
  ) as UserService;
  const [users, setUsers] = useState<LightUserViewModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Kullanıcıların yüklenmesi sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return {users, fetchUsers, loading, error};
}
