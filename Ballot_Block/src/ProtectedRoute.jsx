import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (!firebaseUser && !hasChecked) {
        alert("Please login to vote.");
        setHasChecked(true);
      }
    });

    return () => unsubscribe();
  }, [hasChecked]);

  if (loading) return <p style={{ color: "white" }}>Checking authentication...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;