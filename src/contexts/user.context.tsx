import React, {createContext, useState, useContext, useEffect} from 'react';
import {User} from '@entities/user.entity';
import {UserService} from '@services/backend/concrete/user.service';

interface UserContextType {
  user: User | null;
  fetchUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserProfile = async () => {
    try {
      const userService = new UserService();
      const response = await userService.getCurrentUser();
      if (response) {
        setUser(response);
      }
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{user, fetchUserProfile}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an UserProvider');
  }
  return context;
};
