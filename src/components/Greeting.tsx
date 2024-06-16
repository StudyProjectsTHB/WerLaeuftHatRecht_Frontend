import React from 'react';

const Greeting: React.FC<{ name: string }> = ({ name }) => {
    return (
        <div className="greeting">
            <h1>Hallo {name}!</h1>
            <img src="images/UserIcon.png" alt="greeting-icon" />
        </div>
    );
};

export default Greeting;