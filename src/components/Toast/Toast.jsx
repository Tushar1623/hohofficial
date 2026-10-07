import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: isSuccess ? '#0d1f12' : isError ? '#260f0f' : '#141414',
        border: `1px solid ${isSuccess ? '#22c55e' : isError ? '#ef4444' : '#FF8A00'}`,
        color: '#FFFFFF',
        padding: '14px 20px',
        borderRadius: '8px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.8), 0 0 15px rgba(255,138,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: "var(--font-mono, 'Space Grotesk', monospace)",
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.04em',
        maxWidth: 'min(90vw, 420px)',
        animation: 'slideUp 0.3s ease-out'
      }}
      role="status"
      aria-live="polite"
    >
      <span
        className="material-symbols-outlined"
        style={{
          color: isSuccess ? '#22c55e' : isError ? '#ef4444' : '#FF8A00',
          fontSize: '20px'
        }}
      >
        {isSuccess ? 'check_circle' : isError ? 'error' : 'info'}
      </span>
      <span>{toast.message}</span>
    </div>
  );
};
