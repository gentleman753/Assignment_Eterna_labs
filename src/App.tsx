import React, { useState, useEffect } from 'react';
import { Provider } from './context/StoreContext';
import Dashboard from './components/layout/Dashboard';
import ErrorBoundary from './components/ui/ErrorBoundary';

const App = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="h-screen w-screen bg-[#020203]" />;
  return (
    <ErrorBoundary>
      <Provider><Dashboard /></Provider>
    </ErrorBoundary>
  );
};

export default App;