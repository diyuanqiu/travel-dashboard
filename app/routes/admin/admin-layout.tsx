import React from 'react';
import { Outlet } from 'react-router';

const AdminLayout = () => {
    return (
        <div className='admin-layout'>
            <h1>layout</h1>
            <aside className='children'>
                <Outlet />
            </aside>
        </div>
    );
}

export default AdminLayout;
