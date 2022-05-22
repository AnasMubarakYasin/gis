import { Link } from 'react-router-dom';

function PageHome(props) {
  return (
    <section>
      <h1>
        Home
      </h1>
      <nav>
        <Link to={"/admin"}>Admin</Link>
      </nav>
    </section>
  )
}

export default PageHome