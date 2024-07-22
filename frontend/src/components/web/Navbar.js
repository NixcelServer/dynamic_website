import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../Industries/css/custom.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';

const Navbar = () => {
  const dispatch = useDispatch();
  const navmenu = useSelector(state => state.navbarMenu.allNavMenu);

  useEffect(() => {  
    dispatch(getAllNavMenu());
  }, [dispatch]);

  // Sort navmenu by sequence_no
  const sortedNavMenu = [...navmenu].sort((a, b) => a.sequence_no - b.sequence_no);

  const renderSubMenu = (subMenu) => {
    const sortedSubMenu = [...subMenu].sort((a, b) => a.sequence_no - b.sequence_no);
    return (
      <ul className="dropdown-menu">
        {sortedSubMenu.map((subItem, index) => (
          <li key={index} className={`dropdown ${subItem.sub_menus2 && subItem.sub_menus2.length > 0 ? 'dropdown-submenu' : ''}`}>
            <Link to={subItem.link || '#'} className="dropdown-item">
              {subItem.sub_menu_1_name}
            </Link>
            {subItem.sub_menus2 && renderSubSubMenu(subItem.sub_menus2)}
          </li>
        ))}
      </ul>
    );
  };

  const renderSubSubMenu = (subSubMenu) => {
    if (!subSubMenu || subSubMenu.length === 0) {
      return null; // Don't render anything if subSubMenu does not exist or is empty
    }
    const sortedSubSubMenu = [...subSubMenu].sort((a, b) => a.sequence_no - b.sequence_no);
    return (
      <ul className="dropdown-menu">
        {sortedSubSubMenu.map((subItem, index) => (
          <li key={index}>
            <Link to={subItem.link || '#'} className="dropdown-item">
              {subItem.sub_menu_2_name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header role="banner">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Industries</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample05">
            <ul className="navbar-nav ml-auto">
              {sortedNavMenu.map((item, index) => (
                <li key={index} className={`nav-item ${item.sub_menus && item.sub_menus.length > 0 ? 'dropdown' : ''}`}>
                  <Link to={item.link || '#'} className={`nav-link ${item.sub_menus && item.sub_menus.length > 0 ? 'dropdown-toggle' : ''}`}>
                    {item.n_menu_name}
                  </Link>
                  {item.sub_menus && renderSubMenu(item.sub_menus)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
