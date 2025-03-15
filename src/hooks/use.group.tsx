import {useState, useEffect} from 'react';
import {useCache} from './Modular/use.cache';
import {useAppStateListener} from './Modular/use.appstate.listener';
import {useNetworkListener} from './Modular/use.network.listener';
import {useBackgroundFetch} from './Modular/use.background.fetch';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import {ServiceType} from '@services/backend/concrete/service.container';
import UserService from '@services/backend/concrete/user.service';
import GroupViewModel from '@viewmodels/group.viewmodel';
import {BackendError} from '@services/backend/concrete/backend.error';

export interface UseGroupProps {
  groupId: string;
  cache?: boolean;
  cacheExpiration?: number;
  retryCount?: number;
  retryDelay?: number;
  pageSize?: number;
  backgroundFetchInterval?: number;
}
export default function useGroup({
  groupId,
  cache = false,
  cacheExpiration = 300000,
  pageSize = 10,
  backgroundFetchInterval = 300000,
}: UseGroupProps) {
  const userService = ServiceContainer.getService(
    ServiceType.UserService,
  ) as UserService;
  const [group, setGroup] = useState<GroupViewModel | null>(null);
  const cacheKey = `group_${groupId}`;
  const {getCache, setCache, clearCache} = useCache(cacheKey, cacheExpiration);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  async function fetchGroup(reset: boolean = false): Promise<void> {
    setLoading(true);
    try {
      let fetchedGroup;
      let offset = reset ? 0 : (page - 1) * pageSize;

      if (cache && reset) await clearCache();
      if (cache && !reset) {
        const cachedData = await getCache();
        if (cachedData) {
          setGroup(cachedData as GroupViewModel);
          setLoading(false);
          return;
        }
      }
      fetchedGroup = await userService.getGroupById(groupId, offset, pageSize);
      if (reset) setGroup(fetchedGroup);
      else
        setGroup(prev => {
          if (!prev) return fetchedGroup;
          return {
            ...prev,
            users: [...(prev.users || []), ...(fetchedGroup.users || [])],
            id: prev.id || fetchedGroup.id,
            name: prev.name || fetchedGroup.name,
          };
        });
      setHasMore(fetchedGroup.users.length >= pageSize);
      if (cache) await setCache(group);
    } catch (err: any) {
      if (err instanceof BackendError) {
        if (err.status === 416 || err.status === 404) {
          setHasMore(false);
        }
      } else {
        console.error('Bilinmeyen bir hata oluştu:', err);
        setError('Bilinmeyen bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  }
  const refresh = async () => {
    setPage(1);
  };

  useEffect(() => {
    if (page === 1) {
      fetchGroup(true);
    }
  }, [page]);

  useAppStateListener(fetchGroup);
  useNetworkListener(fetchGroup);
  useBackgroundFetch(fetchGroup, backgroundFetchInterval);

  return {
    group,
    fetchGroup,
    loading,
    error,
    clearCache,
    refresh,
    loadMore: () => hasMore && !loading && setPage(prev => prev + 1),
    hasMore,
  };
}
