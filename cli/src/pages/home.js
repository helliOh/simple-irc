import Link from 'next/link';
import { connect } from 'react-redux';
import Clock from '../components/Clock';
import AddCount from '../components/AddCount';

const HomePage = ({ title, tick }) => (
  <div>
    <h1>{title}</h1>
    <Clock lastUpdate={tick.lastUpdate} light={tick.light} />
    <AddCount />
    <nav>
      <Link href="/">
        <a>Navigate</a>
      </Link>
    </nav>
  </div>
);

export default connect((state) => state)(HomePage);