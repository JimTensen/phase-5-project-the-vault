import React from 'react';

function Home({ user }) {
  if (user) {
    return <h1>Welcome, {user.username}!</h1>;
  } else {
    return (<div><h1>Welcome!</h1>
           <h2>Please Login or Sign Up</h2></div>)
  }
}

export default Home;
