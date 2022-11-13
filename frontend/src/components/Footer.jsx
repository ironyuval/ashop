import {
  Link,
} from 'react-router-dom';

const Footer = () => (
  <nav>
    <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid black' }}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/about">About</Link>
      </div>
      <div>
        <Link to="/users">Users</Link>
      </div>
    </div>
  </nav>
);

export default Footer;
