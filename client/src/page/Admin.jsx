import React from 'react';
import AdminEnter from '../components/AdminEnter/AdminEnter';
import AdminPanel from '../components/AdminPanel/AdminPanel';

function Admin() {
  const admin = JSON.parse(sessionStorage.getItem('admin'));
  const isAdminLoggedIn = admin && admin.isLoggedIn !== false && admin.isLoggedIn !== null;

  console.log(isAdminLoggedIn);

  return (
    <div>
      {isAdminLoggedIn ? <AdminPanel /> : <AdminEnter />}
    </div>
  );
}

export default Admin;
