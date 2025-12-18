import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import '../assets/css/story.css';

/**
 * Story Page Component
 * Displays information about ITCPR's history, vision, and objectives
 */
function Story() {
  const location = useLocation();
  
  return (
    <div className="story-page">
      <SEO
        title="Our Story"
        description="Learn about ITCPR's mission, vision, and objectives. Discover how we're transcending traditional boundaries in science and providing research opportunities."
        keywords="ITCPR story, mission, vision, objectives, physics research, science education"
        url={location.pathname}
      />
      <PageHeader />
      <StorySection />
      <VisionSection />
      <ObjectivesSection />
    </div>
  );
}

/**
 * Page Header Component
 * Hero section for the story page
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>About ITCPR</h1>
          <p>
            Learn about our journey, vision, and commitment to advancing 
            theoretical and computational physics research.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Story Section Component
 * Displays the founding story of ITCPR
 */
function StorySection() {
  return (
    <section className="story-section">
      <div className="container">
        <div className="story-grid">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              In December 2023, atop the breathtaking Rocky Mountains, two 
              graduate students from Bangladesh studying in the USA found 
              themselves reflecting on a long-standing dream. Surrounded by 
              the serene beauty of nature, we solidified our shared vision—the 
              Institute for Theoretical and Computational Physics Research (ITCPR).
            </p>
            <p>
              Our passion for physics and our desire to make research opportunities 
              more accessible have been guiding lights throughout our academic 
              journeys. Over the years, we dreamed of a platform where budding 
              physicists could collaborate, learn, and contribute to pushing the 
              boundaries of knowledge.
            </p>
            <p>
              That day in the Rockies, we decided it was time to turn this dream 
              into a reality. ITCPR was born not just as an institute but as a 
              testament to the power of dreams, collaboration, and the enduring 
              spirit of curiosity.
            </p>
          </div>
          <div className="story-image">
            <img 
              src="/assets/image/IMG_7700.jpg" 
              alt="ITCPR Founding Moment" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Vision Section Component
 * Displays ITCPR's vision statement
 */
function VisionSection() {
  return (
    <section className="vision-section">
      <div className="container">
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p>
            ITCPR aspires to establish itself as a leading institution in 
            theoretical and computational physics, driving innovation and advancing 
            the frontiers of scientific research. Our vision encompasses the creation 
            of an inclusive global research community that transcends geographical 
            and socioeconomic barriers.
          </p>
          <p>
            We are committed to providing comprehensive resources and opportunities 
            to emerging physicists from underrepresented regions, enabling them to 
            make significant contributions to the scientific community. Through 
            strategic partnerships, mentorship programs, and a dedication to academic 
            excellence, we aim to advance the field of physics while cultivating the 
            next generation of scientific leaders.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Objectives Section Component
 * Displays ITCPR's objectives organized by category
 */
function ObjectivesSection() {
  const objectives = [
    {
      title: 'Establishing a Global Research Network',
      items: [
        'Developing an international network of physicists, with particular focus on regions with limited research infrastructure.',
        'Facilitating cross-cultural collaboration and knowledge exchange within the scientific community.'
      ]
    },
    {
      title: 'Advancing Theoretical and Computational Physics',
      items: [
        'Conducting innovative research in fundamental areas of theoretical and computational physics.',
        'Implementing novel methodologies and analytical frameworks in physics research.'
      ]
    },
    {
      title: 'Enhancing Professional Development',
      items: [
        'Delivering comprehensive training programs and educational resources in theoretical and computational physics.',
        'Providing virtual workshops, seminars, and lectures to facilitate continuous professional development.'
      ]
    },
    {
      title: 'Technical and Research Competency Development',
      items: [
        'Implementing training programs in essential technical skills, including programming, data analysis, and scientific computing.',
        'Strengthening research methodology and analytical capabilities for academic and professional advancement.'
      ]
    },
    {
      title: 'Scientific Communication and Public Engagement',
      items: [
        'Establishing digital platforms for disseminating research findings and scientific insights.',
        'Implementing outreach initiatives to enhance public understanding of physics and scientific research.'
      ]
    }
  ];

  return (
    <section className="objectives-section">
      <div className="container">
        <div className="objectives-content">
          <h2>Our Objectives</h2>
          {objectives.map((objective, index) => (
            <ObjectiveGroup 
              key={index} 
              title={objective.title} 
              items={objective.items} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Objective Group Component
 * Individual objective card with title and list items
 */
function ObjectiveGroup({ title, items }) {
  return (
    <div className="objective-group">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Story;
