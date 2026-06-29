import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Documents from './pages/Documents';
import Analytics from './pages/Analytics';
import OrgChart from './pages/OrgChart';
import ActionChecklist from './pages/ActionChecklist';
import KPI from './pages/KPI';
import Performance from './pages/Performance';
import Chat from './pages/Chat';
import ProjectManagers from './pages/ProjectManagers';
import Clients from './pages/Clients';
import Contractors from './pages/Contractors';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="documents" element={<Documents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="org-chart" element={<OrgChart />} />
          <Route path="action-checklist" element={<ActionChecklist />} />
          <Route path="kpi" element={<KPI />} />
          <Route path="performance" element={<Performance />} />
          <Route path="chat" element={<Chat />} />
          <Route path="project-managers" element={<ProjectManagers />} />
          <Route path="clients" element={<Clients />} />
          <Route path="contractors" element={<Contractors />} />
          <Route path="*" element={<div className="p-8 text-center text-muted-foreground">דף לא נמצא</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
