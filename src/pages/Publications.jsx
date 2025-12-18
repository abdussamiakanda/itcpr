import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import '../assets/css/publications.css';

/**
 * Publications Page Component
 * Displays ITCPR's research publications
 */
function Publications() {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const { data, error } = await supabase
          .from('publications')
          .select('*');

        if (!error && data) {
          // Sort by date (newest first)
          const sorted = data.sort((a, b) => {
            // Convert year to number
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;
            
            // If years are different, sort by year
            if (yearA !== yearB) {
              return yearB - yearA; // Descending (newest first)
            }
            
            // If years are same, sort by month
            const monthNames = [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ];
            
            const monthA = monthNames.indexOf(a.month) !== -1 
              ? monthNames.indexOf(a.month) 
              : parseInt(a.month) - 1 || 0;
            const monthB = monthNames.indexOf(b.month) !== -1 
              ? monthNames.indexOf(b.month) 
              : parseInt(b.month) - 1 || 0;
            
            return monthB - monthA; // Descending (newest first)
          });
          
          setPublications(sorted);
        }
      } catch (err) {
        console.error('Error fetching publications:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div className="publications-page">
      <PageHeader />
      <PublicationsSection publications={publications} isLoading={isLoading} />
    </div>
  );
}

/**
 * Page Header Component
 * Hero section for the publications page
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Publications</h1>
          <p>
            Discover the impactful research produced at ITCPR. Browse through our collection 
            of peer-reviewed papers, articles, and research documents that reflect our 
            commitment to advancing scientific knowledge.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Publications Section Component
 * Displays the list of publications
 */
function PublicationsSection({ publications, isLoading }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Recent Publications</h2>
        </div>
        <p className="section-description">
          For group-specific research, visit the respective group pages. Our publications 
          showcase the innovative work being conducted across various domains of theoretical 
          and computational physics.
        </p>
        {isLoading ? (
          <div className="loading-state">
            <p>Loading publications...</p>
          </div>
        ) : publications.length === 0 ? (
          <div className="empty-state">
            <p>No publications available at this time.</p>
          </div>
        ) : (
          <div className="publications-list">
            {publications.map((pub, index) => (
              <PublicationCard key={pub.id} publication={pub} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Publication Card Component
 * Individual publication card
 */
function PublicationCard({ publication, index }) {
  const typeClass = publication.type?.replaceAll(' ', '-').toLowerCase() || 'other';
  
  return (
    <div className="publication-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="publication-content">
        <div className="publication-details">
          {publication.title && <b className="title">{publication.title}</b>}
          {publication.authors && publication.title && ', '}
          {publication.authors && <span className="authors">{publication.authors}</span>}
          {publication.journal && (
            <>
              {publication.title && ', '}
              <span className="journal">{publication.journal}</span>
            </>
          )}
          {(publication.month || publication.year) && (
            <>
              {' ('}
              {publication.month && <span>{publication.month} </span>}
              {publication.year && <span>{publication.year}</span>}
              {')'}
            </>
          )}
        </div>
        <div className="publication-footer">
          <div className="publication-tags">
            <span className={typeClass}>{publication.type}</span>
            {publication.group && <span className="group-tag">{publication.group}</span>}
          </div>
          {publication.doi && (
            <a 
              href={publication.doi} 
              className="publication-link" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View details →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Publications;

