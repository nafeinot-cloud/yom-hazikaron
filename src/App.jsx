import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import PersonForm from './components/PersonForm.jsx';
import PersonDetail from './components/PersonDetail.jsx';
import { FontSizeProvider, useFontSize } from './lib/FontSizeContext.jsx';

function ScaledRoutes() {
  const { scale } = useFontSize();
  return (
    <div style={{ zoom: scale }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<PersonForm />} />
        <Route path="/edit/:id" element={<PersonForm />} />
        <Route path="/person/:id" element={<PersonDetail />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <FontSizeProvider>
      <ScaledRoutes />
    </FontSizeProvider>
  );
}
