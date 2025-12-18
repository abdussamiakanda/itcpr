import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Story from './pages/Story';
import Groups from './pages/Groups';
import Publications from './pages/Publications';
import People from './pages/People';
import Contact from './pages/Contact';
import News from './pages/News';
import Newsletters from './pages/Newsletters';
import Internships from './pages/Internships';
import Outreach from './pages/Outreach';
import Support from './pages/Support';
import Scholarships from './pages/Scholarships';
import Collaborations from './pages/Collaborations';
import Charter from './pages/Charter';
import Infrastructure from './pages/Infrastructure';
import GroupPage from './pages/GroupPage';
import Financials from './pages/Financials';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';
import Unsubscribe from './pages/Unsubscribe';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:groupName" element={<GroupPage />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/people" element={<People />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<News />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/outreach" element={<Outreach />} />
          <Route path="/support" element={<Support />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/collaborations" element={<Collaborations />} />
          <Route path="/charter" element={<Charter />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

