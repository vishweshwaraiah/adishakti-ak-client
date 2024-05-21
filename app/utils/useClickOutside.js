import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

const useClickOutside = (ref, handler) => {
  const [isForeground, setIsForeground] = useState(false);

  useEffect(() => {
    const touchHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Add event listener for touch events
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setIsForeground(nextAppState === 'active');
    });

    if (isForeground) {
      touchHandler();
    }

    return () => {
      // Clean up the event listener
      subscription.remove();
    };
  }, [ref, handler]);
};

export default useClickOutside;
