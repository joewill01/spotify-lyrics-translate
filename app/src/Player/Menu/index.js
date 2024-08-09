import React, { useState } from 'react';

import './Menu.css';

function Menu(props) {
    let [open, setOpen] = useState(false)

    return (
		<div className="Menu">
            <div className={`Menu__button ${open ? "active" : ""}`} onClick={() => {setOpen(!open)}}>
                <div className="Menu__button__button-elements">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className={`Menu__items ${open ? "active" : ""}`}>
                <span className="Menu__items__item" onClick={props.onLogoutClick ? props.onLogoutClick : () => {}}>Log Out</span>
            </div>

            <span className={`Menu__background-blur ${open ? "active" : ""}`} onClick={() => {setOpen(false)}}/>
		</div>
    );
  }
  
  export default Menu;
