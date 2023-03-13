import React from 'react'

const NotFound = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <h1 style={{ marginBottom: '10px' }}>Error 404: Not Found</h1>
            <p>The requested page could not be found.</p>
        </div>
    )
}

export default NotFound