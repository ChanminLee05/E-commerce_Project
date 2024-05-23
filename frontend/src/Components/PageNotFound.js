import React from 'react';
const PageNotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column vh-100">
            <h1 style={{fontSize: '10vw'}}>404</h1>
            <h3 style={{fontSize: '4vw'}}>Not Found</h3>
            <p style={{fontSize: '1.2vw'}}>The resources requested could not be found on this server!</p>
        </div>
    );
};

export default PageNotFound;
