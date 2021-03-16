import React from 'react';
import { Spinner as Loader } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './spinner.scss'

const Spinner = () => {
  const loader = useSelector(state => state.common.isLoading)
  
  return (
    <>
      { loader ? 
        <div className="spinner">
          <Loader className="spinner-icon" animation="grow" role="status">
            <span className="sr-only">Loading...</span>
          </Loader>
        </div> : null }
    
    </>
  );
}
 
export default Spinner;