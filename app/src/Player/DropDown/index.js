import React, { useState } from 'react';

import './DropDown.css';

function DropDown(props) {
    let [open, setOpen] = useState(false)

    return (
		<div className={`DropDown ${open?"active":""}`}>
        <span className="DropDown__label">
            Translate To:
        </span>

        <span className="DropDown__selected-item" onClick={() => {setOpen(!open)}}>
            🇬🇧 English (UK)
        </span>

        <div className="DropDown__items">
            <div className="DropDown__items__item">
                <span className="DropDown__items__item__name">No Translation</span>
            </div>

            <span className="DropDown__items_seperator" />

            <div className="DropDown__items__item">
                <span className="DropDown__items__item__name">🇬🇧 English (UK)</span>
            </div>

            <div className="DropDown__items__item">
                <span className="DropDown__items__item__name">🇪🇸 Spanish</span>
            </div>

            <div className="DropDown__items__item">
                <span className="DropDown__items__item__name">🇩🇪 German</span>
            </div>
        </div>
		</div>
    );
  }
  
  export default DropDown;
