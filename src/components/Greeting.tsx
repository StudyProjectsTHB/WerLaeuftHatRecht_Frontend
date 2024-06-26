import React from 'react';

const Greeting: React.FC<{ name: string }> = ({ name }) => {

    return (
        <div className="greeting">
            <div>
                <h1>Hallo {name}!</h1>
                <p style={{display: 'none'}} className={"greetingJustiz"}>OLG Cottbus</p>
            </div>
            <img src="images/UserIcon.png" alt="greeting-icon" />
        </div>
    );
};

export default Greeting;
