import React from 'react';
import {useHistory} from 'react-router-dom';
import {convertUmlauts} from "../util/service/util";

const Greeting: React.FC<{ adjective: string, noun: string, group: string }> = ({adjective, noun, group}) => {
    const image = `images/${convertUmlauts(noun)}.png`;
    const history = useHistory();

    const handleImageClick = () => {
        history.push('/tabs/settings')
    };

    return (
        <div className="greeting">
            <div>
                <h1>Hallo {adjective + " " + noun}!</h1>
                <p style={{display: 'none'}} className={"greetingJustiz"}>{group}</p>
            </div>
            <img
                src={image}
                alt="greeting-icon"
                onClick={handleImageClick}
                style={{cursor: 'pointer'}}
            />
        </div>
    );
};

export default Greeting;
