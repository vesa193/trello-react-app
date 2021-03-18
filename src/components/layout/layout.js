import React from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import Navigation from '../navigation/navigation';
import './layout.scss'

const Layout = ({ children, background, notFoundBackgroud, contentClassName }) => {
  const history = useHistory()
  const style1 = { backgroundColor: `var(--${background})`, backgroundImage: `url(${background})` }
  const styleNotFound = { backgroundColor: notFoundBackgroud }
  const style2 = { backgroundColor: '' || styleNotFound }
  const style = !background?.length && !history.location.pathname.includes('board/') ? style2 : style1

  return (
    <div className="layout">
      <Spinner />
      <Navigation />
      <div style={style} className={`content-placeholder ${!contentClassName ? '' : `${contentClassName} `}`}>
        {children}
      </div>
    </div>
  );
}
 
export default Layout;