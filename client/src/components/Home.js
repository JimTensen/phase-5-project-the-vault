import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>welcome to the Vault</h1>
      <Link to="/login">Login</Link>
      <Link to="/upload-card">Upload Card Information</Link>
    </div>
  );
}

export default Home;
