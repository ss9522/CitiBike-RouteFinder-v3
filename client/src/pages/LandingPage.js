import React from 'react';

function LandingPage() {
  return (
    <div
      className="page-content"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        flexDirection: 'column',
        paddingTop: '50px', // Adjust to position content higher or lower
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>CitiBike Route Planner</h1>
      <p style={{ fontSize: '2rem', }}>This is a web app designed to help plan routes for Citibike journeys.</p>
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      
    </div>
  );
}

export default LandingPage;