'use client';

import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_visit_registered';

export default function VisitorCounter() {
  const [total, setTotal] = useState(null);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadVisitorCount() {
      try {
        const hasRegisteredVisit = window.localStorage.getItem(STORAGE_KEY) === 'true';
        const response = await fetch('/api/visitor-count', {
          method: hasRegisteredVisit ? 'GET' : 'POST',
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Visitor counter unavailable.');
        }

        const data = await response.json();

        if (!hasRegisteredVisit) {
          window.localStorage.setItem(STORAGE_KEY, 'true');
        }

        if (isMounted) {
          setTotal(Number(data.total || 0));
        }
      } catch {
        if (isMounted) {
          setIsUnavailable(true);
        }
      }
    }

    loadVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isUnavailable) {
    return null;
  }

  return (
    <div className="visitor-counter" aria-live="polite">
      <span className="visitor-counter-icon">
        <Eye size={18} aria-hidden="true" />
      </span>
      <span>
        <strong>{total === null ? '...' : total.toLocaleString('pt-BR')}</strong>
        <small>visualizações registradas</small>
      </span>
    </div>
  );
}
