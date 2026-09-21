import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

export default function NotFound() {
  return (
    <div className="container-page py-16 sm:py-24">
      <EmptyState
        kind="error"
        title="404 — Page not found"
        description="The page you are looking for does not exist or has been moved. Let's get you back on track."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Browse Products
          </Link>
        </div>
      </EmptyState>
    </div>
  )
}