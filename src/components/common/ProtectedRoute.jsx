import { Navigate } from 'react-router-dom';
import { getStorageValue } from '../../hooks/useStorage';

/**
 * Route guard that redirects to a fallback path
 * if the user has not purchased the course.
 */
export default function ProtectedRoute({ children, redirectTo = '/enrollment-success' }) {
    const hasPurchased = getStorageValue('course_purchased', false);

    if (!hasPurchased) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}
