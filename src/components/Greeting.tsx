import React from 'react';
import { useHistory } from 'react-router-dom';

const Greeting: React.FC<{ name: string }> = ({ name }) => {
    const history = useHistory();

    const handleImageClick = () => {
        history.push('/tabs/settings')
    };

    return (
        <div className="greeting">
            <div>
                <h1>Hallo {name}!</h1>
                <p style={{display: 'none'}} className={"greetingJustiz"}>OLG Cottbus</p>
            </div>
            <img
                src="images/UserIcon.png"
                alt="greeting-icon"
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}

            />
        </div>
    );
};

export default Greeting;
