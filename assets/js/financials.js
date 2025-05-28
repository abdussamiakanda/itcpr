// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format percentage
const formatPercentage = (value) => {
  return `${value}%`;
};

// Create budget card
const createBudgetCard = (title, amount, percentage) => {
  return `
    <div class="budget-card">
      <h3>${title}</h3>
      <div class="budget-amount">${formatCurrency(amount)}</div>
      <div class="budget-percentage">${formatPercentage(percentage)} of budget</div>
    </div>
  `;
};

// Create expenditure card
const createExpenditureCard = (title, amount, items) => {
  return `
    <div class="expenditure-card">
      <h3>${title}</h3>
      <div class="budget-amount">${formatCurrency(amount)}</div>
      <ul class="expenditure-list">
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
};

// Create metric card
const createMetricCard = (label, value) => {
  return `
    <div class="metric-card">
      <div class="metric-value">${value}</div>
      <div class="metric-label">${label}</div>
    </div>
  `;
};

// Create control item
const createControlItem = (title, description) => {
  return `
    <div class="control-item">
      <h4>${title}</h4>
      <p>${description}</p>
    </div>
  `;
};

// Update funding chart
let fundingChartInstance = null;
const updateFundingChart = (fundingData) => {
  const ctx = document.getElementById('fundingChart').getContext('2d');
  
  // Destroy existing chart if it exists
  if (fundingChartInstance) {
    fundingChartInstance.destroy();
  }

  // Create new chart
  fundingChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(fundingData).map(key => 
        key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      ),
      datasets: [{
        data: Object.values(fundingData).map(source => source.total),
        backgroundColor: [
          '#1a73e8',
          '#34a853',
          '#fbbc05',
          '#ea4335'
        ]
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

// Load and display financial data
const loadFinancialData = async (year) => {
  try {
    const response = await fetch('/data/finance.json');
    const data = await response.json();
    const yearData = data.years[year];

    if (!yearData) {
      console.error(`No data available for year ${year}`);
      return;
    }

    // Update year selector
    document.getElementById('yearTitle').textContent = `${year} Financial Overview`;

    // Update audit status
    const auditStatus = document.getElementById('auditStatus');
    if (yearData.audit === 'Pending') {
      auditStatus.innerHTML = `
        <div class="audit-pending">
          <i class="fas fa-clock"></i>
          Audit Status: Pending - Will be completed in December ${year}
        </div>
      `;
      document.getElementById('dynamicContent').innerHTML = ``;
      document.getElementById('budgetSummary').innerHTML = ``;
      return;
    } else if (yearData.audit === 'Completed') {
      auditStatus.innerHTML = ``;
      document.getElementById('dynamicContent').innerHTML = `
        <!-- Expenditures Section -->
        <section class="content-section expenditure-section">
          <div class="contained">
            <h2>Research Expenditures</h2>
            <div class="expenditure-grid" id="researchExpenditures">
              <!-- Research expenditure cards will be populated by JavaScript -->
            </div>
          </div>
        </section>

        <!-- Operational Costs Section -->
        <section class="content-section expenditure-section">
          <div class="contained">
            <h2>Operational Costs</h2>
            <div class="expenditure-grid" id="operationalCosts">
              <!-- Operational costs cards will be populated by JavaScript -->
            </div>
          </div>
        </section>

        <!-- Educational Initiatives Section -->
        <section class="content-section expenditure-section">
          <div class="contained">
            <h2>Educational Initiatives</h2>
            <div class="expenditure-grid" id="capacityBuilding">
              <!-- Educational Initiatives cards will be populated by JavaScript -->
            </div>
          </div>
        </section>

        <!-- Outreach & Communications Section -->
        <section class="content-section expenditure-section">
          <div class="contained">
            <h2>Outreach & Communications</h2>
            <div class="expenditure-grid" id="administrativeExpenses">
              <!-- Outreach & Communications cards will be populated by JavaScript -->
            </div>
          </div>
        </section>

        <!-- Funding Sources Section -->
        <section class="content-section funding-sources">
          <div class="contained">
            <h2>Funding Sources</h2>
            <div class="funding-chart">
              <canvas id="fundingChart"></canvas>
            </div>
            <div class="expenditure-grid" id="fundingSources">
              <!-- Funding source cards will be populated by JavaScript -->
            </div>
          </div>
        </section>

        <!-- Key Metrics Section -->
        <section class="content-section">
          <div class="contained">
            <div class="metrics-grid" id="keyMetrics">
              <!-- Metric cards will be populated by JavaScript -->
            </div>
          </div>
        </section>

        <!-- Financial Controls Section -->
        <section class="content-section controls-section">
          <div class="contained">
            <h2>Financial Controls and Oversight</h2>
            <div class="controls-list" id="financialControls">
              <!-- Control items will be populated by JavaScript -->
            </div>
          </div>
        </section>

        <!-- Last Updated -->
        <section class="content-section last-updated-section">
          <div class="contained">
            <div class="last-updated" id="lastUpdated">
              Last Updated: February 15, 2024
            </div>
          </div>
        </section>
      `;
    }

    // Update budget summary
    document.getElementById('budgetSummary').innerHTML = `
      ${createBudgetCard('Total Budget', yearData.total_budget, 100)}
      ${createBudgetCard('Funds Collected', Object.values(yearData.funding_sources).reduce((sum, source) => sum + source.total, 0), 
        (Object.values(yearData.funding_sources).reduce((sum, source) => sum + source.total, 0) / yearData.total_budget * 100).toFixed(1))}
      ${createBudgetCard('Total Expenses', 
        yearData.research_expenditures.categories.research_traveling.amount + 
        yearData.research_expenditures.categories.publication.amount +
        yearData.operational_costs.categories.facility_maintenance.amount + 
        yearData.operational_costs.categories.server_maintenance.amount +
        yearData.educational_initiatives.categories.educational_programs.amount + 
        yearData.educational_initiatives.categories.student_support.amount +
        yearData['outreach_&amp;_communication'].categories.community_engagement.amount + 
        yearData['outreach_&amp;_communication'].categories.promotional_activity.amount,
        ((yearData.research_expenditures.categories.research_traveling.amount + 
          yearData.research_expenditures.categories.publication.amount +
          yearData.operational_costs.categories.facility_maintenance.amount + 
          yearData.operational_costs.categories.server_maintenance.amount +
          yearData.educational_initiatives.categories.educational_programs.amount + 
          yearData.educational_initiatives.categories.student_support.amount +
          yearData['outreach_&amp;_communication'].categories.community_engagement.amount + 
          yearData['outreach_&amp;_communication'].categories.promotional_activity.amount) / yearData.total_budget * 100).toFixed(1))}
      ${createBudgetCard('Surplus', 
        Object.values(yearData.funding_sources).reduce((sum, source) => sum + source.total, 0) - 
        (yearData.research_expenditures.categories.research_traveling.amount + 
        yearData.research_expenditures.categories.publication.amount +
        yearData.operational_costs.categories.facility_maintenance.amount + 
        yearData.operational_costs.categories.server_maintenance.amount +
        yearData.educational_initiatives.categories.educational_programs.amount + 
        yearData.educational_initiatives.categories.student_support.amount +
        yearData['outreach_&amp;_communication'].categories.community_engagement.amount + 
        yearData['outreach_&amp;_communication'].categories.promotional_activity.amount),
        ((Object.values(yearData.funding_sources).reduce((sum, source) => sum + source.total, 0) - 
        (yearData.research_expenditures.categories.research_traveling.amount + 
        yearData.research_expenditures.categories.publication.amount +
        yearData.operational_costs.categories.facility_maintenance.amount + 
        yearData.operational_costs.categories.server_maintenance.amount +
        yearData.educational_initiatives.categories.educational_programs.amount + 
        yearData.educational_initiatives.categories.student_support.amount +
        yearData['outreach_&amp;_communication'].categories.community_engagement.amount + 
        yearData['outreach_&amp;_communication'].categories.promotional_activity.amount)) / yearData.total_budget * 100).toFixed(1))}
      ${createBudgetCard('Research', yearData.research_expenditures.categories.research_traveling.amount + 
        yearData.research_expenditures.categories.publication.amount, 
        ((yearData.research_expenditures.categories.research_traveling.amount + 
          yearData.research_expenditures.categories.publication.amount) / yearData.total_budget * 100).toFixed(1))}
      ${createBudgetCard('Operations', yearData.operational_costs.categories.facility_maintenance.amount + 
        yearData.operational_costs.categories.server_maintenance.amount,
        ((yearData.operational_costs.categories.facility_maintenance.amount + 
          yearData.operational_costs.categories.server_maintenance.amount) / yearData.total_budget * 100).toFixed(1))}
      ${createBudgetCard('Initiatives', yearData.educational_initiatives.categories.educational_programs.amount + 
        yearData.educational_initiatives.categories.student_support.amount,
        ((yearData.educational_initiatives.categories.educational_programs.amount + 
          yearData.educational_initiatives.categories.student_support.amount) / yearData.total_budget * 100).toFixed(1))}
      ${createBudgetCard('Outreach', yearData['outreach_&amp;_communication'].categories.community_engagement.amount + 
        yearData['outreach_&amp;_communication'].categories.promotional_activity.amount,
        ((yearData['outreach_&amp;_communication'].categories.community_engagement.amount + 
          yearData['outreach_&amp;_communication'].categories.promotional_activity.amount) / yearData.total_budget * 100).toFixed(1))}
    `;

    // Update research expenditures
    document.getElementById('researchExpenditures').innerHTML = Object.entries(yearData.research_expenditures.categories)
      .map(([key, value]) => createExpenditureCard(
        key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value.amount,
        value.items
      )).join('');

    // Update operational costs
    document.getElementById('operationalCosts').innerHTML = Object.entries(yearData.operational_costs.categories)
      .map(([key, value]) => createExpenditureCard(
        key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value.amount,
        value.items
      )).join('');

    // Update educational initiatives
    document.getElementById('capacityBuilding').innerHTML = Object.entries(yearData.educational_initiatives.categories)
      .map(([key, value]) => createExpenditureCard(
        key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value.amount,
        value.items
      )).join('');

    // Update outreach & communication
    document.getElementById('administrativeExpenses').innerHTML = Object.entries(yearData['outreach_&amp;_communication'].categories)
      .map(([key, value]) => createExpenditureCard(
        key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value.amount,
        value.items
      )).join('');

    // Update funding sources
    document.getElementById('fundingSources').innerHTML = Object.entries(yearData.funding_sources)
      .map(([key, value]) => createExpenditureCard(
        key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value.total,
        [`Total: ${formatCurrency(value.total)}`]
      )).join('');

    // Update funding chart
    updateFundingChart(yearData.funding_sources);

    // Update key metrics
    document.getElementById('keyMetrics').innerHTML = Object.entries(yearData.key_metrics)
      .map(([key, value]) => createMetricCard(
        key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value
      )).join('');

    // Update financial controls
    document.getElementById('financialControls').innerHTML = Object.entries(yearData.financial_controls)
      .map(([key, value]) => createControlItem(
        key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value
      )).join('');

    // Update last updated date
    document.getElementById('lastUpdated').textContent = `Last Updated: ${data.last_updated}`;

  } catch (error) {
    console.error('Error loading financial data:', error);
  }
};

// Initialize year selector
const initializeYearSelector = async () => {
  try {
    const response = await fetch('/data/finance.json');
    const data = await response.json();
    const years = Object.keys(data.years).sort((a, b) => b - a); // Sort years in descending order

    if (years.length === 0) {
      console.error('No years available in the data');
      return;
    }

    document.getElementById('yearSelector').innerHTML = years
      .map(year => `
        <button class="year-button ${year === years[0] ? 'active' : ''}" 
          onclick="loadFinancialData('${year}'); this.classList.add('active'); 
          this.parentElement.querySelectorAll('.year-button').forEach(btn => 
            btn !== this && btn.classList.remove('active')
          )">
          ${year}
        </button>
      `).join('');

    // Load initial year data (most recent year)
    loadFinancialData(years[0]);
  } catch (error) {
    console.error('Error initializing year selector:', error);
  }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeYearSelector);