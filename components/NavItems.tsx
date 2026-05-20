import React from 'react';
import { Link, NavLink } from 'react-router';
import { sidebarItems } from '~/constants';
import { cn } from '~/lib/utils';

const NavItems = ({handClick} : {handClick?: () => void}) => {

    const users = {
        name: 'Adrian',
        email: '@contact',
        imageUrl: '/assets/images/david.webp'
    }

    return (
        <section className='nav-items'>
            <Link to='/' className='link-logo'>
                <img src="/assets/icons/logo.svg" alt="logo" className='size-[30px]'/>
                <h1>TourVisto</h1>
            </Link>

            <div className='container'>
                <nav>
                    {sidebarItems.map(({id, href, icon, label}) => (
                        <NavLink to={href} key={id}>
                            {({isActive} : {isActive: boolean}) => (
                                <div className={cn('group nav-item',{
                                    'bg-primary-100 text-white!' : isActive
                                })} onClick={handClick}>
                                    <img 
                                        src={icon}
                                        alt={label}
                                        className={`group-hover: brightness-0 size-0
                                        group-hover: invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`}
                                    />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <footer className='nav-footer'>
                    <img src={users?.imageUrl || '/assets/images/david.webp'} 
                        alt={users?.name || 'david'}
                    />
                    <article>
                        <h2>{users?.name}</h2>
                        <p>{users?.email}</p>
                    </article>

                    <button onClick={() => {console.log('log out!')}} className='cursor-pointer'>
                        <img src='/assets/icons/logout.svg' alt='logout' className='size-6'/>
                    </button>
                </footer>
            </div>
        </section>
    );
}

export default NavItems;
