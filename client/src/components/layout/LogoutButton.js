import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;