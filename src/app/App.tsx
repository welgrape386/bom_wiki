import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ContentHubPage } from './components/ContentHubPage';
import { DetailPage } from './components/DetailPage';
import { ServerInfoPage } from './components/ServerInfoPage';
import { HelpPage } from './components/HelpPage';
import { CommandsPage } from './components/CommandsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ backgroundColor: '#F8FFF5' }}>
        <Header />
        <main className="pt-[60px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/content-hub" element={<ContentHubPage />} />
            <Route path="/detail/:contentKey" element={<DetailPage />} />
            <Route path="/server-info" element={<ServerInfoPage />} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
