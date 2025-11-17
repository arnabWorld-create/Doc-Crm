import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', padding: '2rem', lineHeight: '1.6', color: '#333', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '40px auto', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '2rem 3rem', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color: '#0d9488', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
          Doctor CRM - Next.js Project
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          Welcome to your new Doctor CRM application!
        </p>
        <div style={{ padding: '1rem', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '4px', marginTop: '1.5rem' }}>
          <h2 style={{ margin: '0 0 0.5rem 0', color: '#d46b08', fontSize: '1.2rem' }}>Important: How to Run This Project</h2>
          <p style={{ margin: 0 }}>
            This is a full-stack Next.js application, not a simple static website. It includes a backend server and database, so it cannot be run directly in this preview environment.
          </p>
        </div>
        <h3 style={{ color: '#0d9488', marginTop: '2rem' }}>To launch the CRM, please follow these steps:</h3>
        <ol style={{ paddingLeft: '2rem', listStyle: 'decimal', color: '#333' }}>
          <li>Download the project files.</li>
          <li>Ensure you have Node.js and PostgreSQL installed.</li>
          <li>Follow the setup instructions in the <strong>README.md</strong> file.</li>
          <li>Open your computer's terminal, navigate to the project folder, and run these commands:</li>
        </ol>
        <pre style={{ backgroundColor: '#f7f7f7', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '4px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '0.9rem' }}>
          <code style={{ color: '#333' }}>
            <span style={{ color: '#888' }}># 1. Install dependencies</span>
            <br />
            pnpm install
            <br /><br />
            <span style={{ color: '#888' }}># 2. Set up the database</span>
            <br />
            npx prisma migrate dev
            <br /><br />
            <span style={{ color: '#888' }}># 3. Start the development server</span>
            <br />
            pnpm run dev
          </code>
        </pre>
        <p style={{ marginTop: '1.5rem' }}>
          Once the server is running, your CRM will be live at: <a href="http://localhost:3000/patients" target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8', fontWeight: '500' }}>http://localhost:3000/patients</a>
        </p>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
