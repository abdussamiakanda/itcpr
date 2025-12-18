import { useEffect, useRef, useState } from 'react';
import '../assets/css/financials.css';

/**
 * Financials Page Component
 * Displays financial transparency information
 */
function Financials() {
  const [year, setYear] = useState(null);
  const [years, setYears] = useState([]);
  const [yearData, setYearData] = useState(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetch('/data/finance.json')
      .then(res => res.json())
      .then(data => {
        const yearList = Object.keys(data.years).sort((a, b) => b - a);
        setYears(yearList);
        if (yearList.length > 0) {
          setYear(yearList[0]);
        }
      })
      .catch(err => console.error('Error loading financial data:', err));
  }, []);

  useEffect(() => {
    if (!year) return;

    fetch('/data/finance.json')
      .then(res => res.json())
      .then(data => {
        const dataForYear = data.years[year];
        if (dataForYear) {
          setYearData(dataForYear);
        }
      })
      .catch(err => console.error('Error loading financial data:', err));
  }, [year]);

  useEffect(() => {
    if (!yearData || !chartRef.current || !yearData.funding_sources) return;
    
    const initChart = () => {
      if (typeof window === 'undefined' || !window.Chart) {
        setTimeout(initChart, 100);
        return;
      }

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const fundingSources = yearData.funding_sources || {};
    const labels = Object.keys(fundingSources).map(key =>
      key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    );
    const values = Object.values(fundingSources).map(source => source?.total || 0);

    if (labels.length === 0 || values.length === 0) return;

    chartInstanceRef.current = new window.Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: ['#1a73e8', '#34a853', '#fbbc05', '#ea4335', '#9c27b0', '#ff9800']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
    };
    
    initChart();
  }, [yearData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  if (!yearData || !year) {
    return <div className="financials-page">Loading...</div>;
  }

  // Safely calculate total expenses with optional chaining
  const totalExpenses = 
    (yearData.research_expenditures?.categories?.research_traveling?.amount || 0) +
    (yearData.research_expenditures?.categories?.publication?.amount || 0) +
    (yearData.operational_costs?.categories?.facility_maintenance?.amount || 0) +
    (yearData.operational_costs?.categories?.server_maintenance?.amount || 0) +
    (yearData.educational_initiatives?.categories?.educational_programs?.amount || 0) +
    (yearData.educational_initiatives?.categories?.student_support?.amount || 0) +
    (yearData['outreach_&_communication']?.categories?.community_engagement?.amount || 0) +
    (yearData['outreach_&_communication']?.categories?.promotional_activity?.amount || 0);

  const totalFunding = yearData.funding_sources 
    ? Object.values(yearData.funding_sources).reduce((sum, source) => sum + (source?.total || 0), 0)
    : 0;

  return (
    <div className="financials-page">
      <PageHeader />
      <YearSelectorSection years={years} year={year} setYear={setYear} />
      <FinancialOverviewSection 
        year={year}
        yearData={yearData}
        totalFunding={totalFunding}
        totalExpenses={totalExpenses}
        formatCurrency={formatCurrency}
        formatPercentage={formatPercentage}
        chartRef={chartRef}
      />
    </div>
  );
}

/**
 * Page Header Component
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Financial Transparency</h1>
          <p>
            Explore ITCPR's financial management, funding sources, and our commitment 
            to responsible use of resources to advance our research mission.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Year Selector Section Component
 */
function YearSelectorSection({ years, year, setYear }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="year-selector">
          {years.map(y => (
            <button
              key={y}
              className={`year-button ${y === year ? 'active' : ''}`}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Financial Overview Section Component
 */
function FinancialOverviewSection({ 
  year, 
  yearData, 
  totalFunding, 
  totalExpenses, 
  formatCurrency, 
  formatPercentage,
  chartRef 
}) {
  if (yearData.audit === 'Pending') {
    return (
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>{year} Financial Overview</h2>
          </div>
          <div className="audit-status">
            <div className="audit-pending">
              <i className="fas fa-clock"></i>
              Audit Status: Pending - Will be completed in December {year}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>{year} Financial Overview</h2>
          </div>
          <BudgetSummary 
            yearData={yearData}
            totalFunding={totalFunding}
            totalExpenses={totalExpenses}
            formatCurrency={formatCurrency}
            formatPercentage={formatPercentage}
          />
        </div>
      </section>
      <ResearchExpendituresSection yearData={yearData} formatCurrency={formatCurrency} />
      <OperationalCostsSection yearData={yearData} formatCurrency={formatCurrency} />
      <FundingSourcesSection yearData={yearData} formatCurrency={formatCurrency} chartRef={chartRef} />
    </>
  );
}

/**
 * Budget Summary Component
 */
function BudgetSummary({ yearData, totalFunding, totalExpenses, formatCurrency, formatPercentage }) {
  const totalBudget = yearData?.total_budget || 0;
  const percentage = totalBudget > 0 ? (value) => ((value / totalBudget) * 100).toFixed(1) : () => '0';

  return (
    <div className="budget-summary">
      <BudgetCard 
        title="Total Budget"
        amount={totalBudget}
        percentage={100}
        formatCurrency={formatCurrency}
        formatPercentage={formatPercentage}
      />
      <BudgetCard 
        title="Funds Collected"
        amount={totalFunding}
        percentage={percentage(totalFunding)}
        formatCurrency={formatCurrency}
        formatPercentage={formatPercentage}
      />
      <BudgetCard 
        title="Total Expenses"
        amount={totalExpenses}
        percentage={percentage(totalExpenses)}
        formatCurrency={formatCurrency}
        formatPercentage={formatPercentage}
      />
      <BudgetCard 
        title="Surplus"
        amount={totalFunding - totalExpenses}
        percentage={percentage(totalFunding - totalExpenses)}
        formatCurrency={formatCurrency}
        formatPercentage={formatPercentage}
      />
    </div>
  );
}

/**
 * Budget Card Component
 */
function BudgetCard({ title, amount, percentage, formatCurrency, formatPercentage }) {
  return (
    <div className="budget-card">
      <h3>{title}</h3>
      <div className="budget-amount">{formatCurrency(amount)}</div>
      <div className="budget-percentage">{formatPercentage(percentage)} of budget</div>
    </div>
  );
}

/**
 * Research Expenditures Section Component
 */
function ResearchExpendituresSection({ yearData, formatCurrency }) {
  if (!yearData?.research_expenditures?.categories) {
    return null;
  }

  return (
    <section className="content-section expenditure-section">
      <div className="container">
        <div className="section-header">
          <h2>Research Expenditures</h2>
        </div>
        <div className="expenditure-grid">
          {Object.entries(yearData.research_expenditures.categories).map(([key, value], index) => (
            <ExpenditureCard 
              key={key}
              title={key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              amount={value?.amount || 0}
              items={value?.items || []}
              formatCurrency={formatCurrency}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Operational Costs Section Component
 */
function OperationalCostsSection({ yearData, formatCurrency }) {
  if (!yearData?.operational_costs?.categories) {
    return null;
  }

  return (
    <section className="content-section expenditure-section">
      <div className="container">
        <div className="section-header">
          <h2>Operational Costs</h2>
        </div>
        <div className="expenditure-grid">
          {Object.entries(yearData.operational_costs.categories).map(([key, value], index) => (
            <ExpenditureCard 
              key={key}
              title={key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              amount={value?.amount || 0}
              items={value?.items || []}
              formatCurrency={formatCurrency}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Funding Sources Section Component
 */
function FundingSourcesSection({ yearData, formatCurrency, chartRef }) {
  if (!yearData?.funding_sources) {
    return null;
  }

  return (
    <section className="content-section funding-sources">
      <div className="container">
        <div className="section-header">
          <h2>Funding Sources</h2>
        </div>
        <div className="funding-chart">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="expenditure-grid">
          {Object.entries(yearData.funding_sources).map(([key, value], index) => (
            <div key={key} className="expenditure-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3>{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
              <div className="budget-amount">{formatCurrency(value?.total || 0)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Expenditure Card Component
 */
function ExpenditureCard({ title, amount, items, formatCurrency, index }) {
  return (
    <div className="expenditure-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <h3>{title}</h3>
      <div className="budget-amount">{formatCurrency(amount)}</div>
      <ul className="expenditure-list">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Financials;

