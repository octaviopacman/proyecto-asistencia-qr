import React, { useState } from "react";
import './header.css';

function Header() {
    const [sideBar, setsideBar] = useState(false);

    const Style = {
        sideBar: {
            width: '10%',
            marginLeft: '0%',
            display: sideBar ? 'block' : 'none',
            
        }
    };

    return (
        <div>
            <header>
                <div>
                    <button className="botonMenu" onClick={() => setsideBar(!sideBar)}>menu</button>
                </div>
                <div className="title">
                    <h1>Menu</h1>
                </div>
            </header>
            <div className="sideBar" style={Style.sideBar}>
                <p>Opcion 1</p>
                <p>Opcion 2</p>
                <p>Opcion 3</p>
            </div>
            
        </div>
    );
}

export default Header;
