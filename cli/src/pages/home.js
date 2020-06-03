import Link from 'next/link';
import { connect } from 'react-redux';
import AddCount from '../components/AddCount';

const HomePage = (props) => {
  const {title, ticks} = props;
  return(
    <div>
      <h1>{title}</h1>
      <h1>TICK : {ticks}</h1>
      <AddCount {...props}/>
      <nav>
        <Link href="/">
          <a>Navigate</a>
        </Link>
      </nav>
    </div>
  )
};

export default connect((state) => state)(HomePage);