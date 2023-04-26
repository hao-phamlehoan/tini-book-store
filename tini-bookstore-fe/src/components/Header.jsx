import React from 'react';
import './Header.css';
import logo from './Logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ quantity, handleSearch }) => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const search = () => {
        handleSearch(message);
        navigate(`/search`)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };
    return (
        <div className="header">
            <Link to={'/'}>
                <img src={logo} alt="logo" />
            </Link>
            {window.location.pathname == "/management" ? <></> : <>
                <div className="search">
                    <input
                        type="text"
                        placeholder='Tìm kiếm'
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} />
                    <button className='bt-search fa-solid fa-magnifying-glass' onClick={()=>{search()}}></button>
                </div>
                <ul className="navbar-list">
                    <Link to={'cart'}>
                        <li className="navbar-item fa-solid fa-cart-shopping">
                            <div className="badge badge-secondary text-xs absolute ml-6">{quantity}</div>
                            <p>Giỏ hàng</p>
                        </li>
                    </Link>

                </ul>
            </>
            }
        </div>
    )
};

export default Header;

