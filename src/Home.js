import * as React from 'react';
import FormAuth from './components/FormRegister';
import './styles/globalStyles.css'


function BlockWithImageAndText() {
    let photo = require('./img/home.png');
    return (
        <div className={'block1'} style={{
            backgroundImage: `url(${photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div>
                <h2>Oткройте для себя новый лимитированный аромат, который наилучшим образом подчеркнет элегантность.</h2>
            </div>
        </div>
    );
}

export default BlockWithImageAndText;