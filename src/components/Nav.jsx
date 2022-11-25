import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='navBar'>
        <Link to="/"> TODO </Link>
        <ul>
            <li> <Link to="/login"> Login </Link> </li>
            <li> <Link to="/register"> Register </Link> </li>
        </ul>
    </div>
  )
}

export default Nav