// src/components/Generic/Loading.jsx
import React from 'react';

// Você pode passar a prop 'seccional' para ajustar o layout
export function Loading({ seccional = true }) {
  const containerStyle = seccional 
    ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px', // Altura mínima para a seção
        width: '100%',
        color: '#78716c' // Uma cor neutra escura
      }
    : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      };

  return (
    <div style={containerStyle}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #eee',
        borderTop: '4px solid #b3261e', // Usando o vermelho da sua marca
        borderRadius: '50%',
        animation: 'finance-loading-spin 1s linear infinite'
      }} />
      <span style={{ marginLeft: '12px', fontSize: '14px', fontWeight: 500 }}>Carregando dados...</span>

      {/* CSS rápido para a animação do spinner */}
      <style>{`
        @keyframes finance-loading-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
