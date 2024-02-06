import React from 'react';
import AnotherAccess from "../../assets/AnotherAccess.png";

const AccessDeniedPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Access Denied</h1>
      <img src={AnotherAccess} alt="Access Denied" style={styles.image} />
      <p style={styles.text}>You do not have permission to access this page.</p>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  heading: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.2em',
  },
};
export default AccessDeniedPage;
