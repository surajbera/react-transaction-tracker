import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>
        Go back to <Link to='/'>Homepage</Link>
      </p>
    </div>
  )
}

export default NotFound
