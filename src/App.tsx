import React, { useState } from 'react';
import { OpportunityTable } from './components/OpportunityTable/OpportunityTable';
import { OpportunityDetails } from './components/OpportunityDetails/OpportunityDetails';
import { mockOpportunities } from './data/mockData';
import { Opportunity } from './types/opportunity';
import { DollarSign } from 'lucide-react';

function App() {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const handleUpdateOpportunity = (updatedOpportunity: Opportunity) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === updatedOpportunity.id ? updatedOpportunity : opp
    ));
    setSelectedOpportunity(updatedOpportunity);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-3xl font-bold text-gray-900">Opportunities</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {selectedOpportunity ? (
            <OpportunityDetails 
              opportunity={selectedOpportunity}
              onClose={() => setSelectedOpportunity(null)}
              onUpdate={handleUpdateOpportunity}
            />
          ) : (
            <OpportunityTable
              opportunities={opportunities}
              onOpportunityClick={setSelectedOpportunity}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;