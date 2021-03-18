import React from 'react';
import Layout from '../../components/layout/layout';
import './NotFound.scss'

const NotFound = () => {
  return (
    <Layout background="light">
      <div className="not-found">
        <h3>Not Found</h3>
        <h5>404</h5>
      </div>
    </Layout>
  );
}
 
export default NotFound;