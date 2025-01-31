import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutHost, logoutUser } from './http';
import { setAuth } from './Store/authSlice';
import toast from 'react-hot-toast';

const StorageChangeHandler = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const handleStorageChange = async (e) => {
    if (e.key === '_unreal_esports_uuid' || e.key === '_unreal_esports_visibliltiy') {
      let response;

      if (role === 'user') {
        response = await logoutUser();
        toast.success(response.data.message);
      } else if (role === 'host') {
        response = await logoutHost();
        toast.success(response.data.message);
      }
      if (response?.data?.statusCode === 200) {
        localStorage.removeItem('_unreal_esports_uuid');
        localStorage.removeItem('_unreal_esports_visibliltiy');
      }
      
      dispatch(setAuth({ user: null }));
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [role]);

  return null;
};

export default StorageChangeHandler;