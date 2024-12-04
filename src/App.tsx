import React, { useState } from "react";
import { OpportunityTable } from "./components/OpportunityTable/OpportunityTable";
import { OpportunityDetails } from "./components/OpportunityDetails/OpportunityDetails";
import { mockOpportunities } from "./data/mockData";
import { Opportunity } from "./types/opportunity";
import { Plus } from "lucide-react";
import { createDefaultOpportunity } from "./utils/opportunityUtils";
import { ConfirmationModal } from "./components/Modal/ConfirmationModal";

function App() {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteOpportunity, setDeleteOpportunity] =
    useState<Opportunity | null>(null);

  const handleUpdateOpportunity = (updatedOpportunity: Opportunity) => {
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === updatedOpportunity.id ? updatedOpportunity : opp
      )
    );
    setSelectedOpportunity(updatedOpportunity);

    if (updatedOpportunity.stage === "Closed Lost") {
      const jwt = localStorage.getItem("jwt");

      const url = `https://plan-function.azurewebsites.net/api/planstatustrigger?portalId=${updatedOpportunity.portalId}&planId=${updatedOpportunity.planId}&jwt=${jwt}`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleCreateOpportunity = (newOpportunity: Opportunity) => {
    setOpportunities([...opportunities, newOpportunity]);
    setIsCreating(false);
    setSelectedOpportunity(newOpportunity);
  };

  const handleNewClick = () => {
    setIsCreating(true);
    setSelectedOpportunity(null);
  };

  const handleDeleteClick = (opportunity: Opportunity) => {
    setDeleteOpportunity(opportunity);
  };

  const handleConfirmDelete = () => {
    if (deleteOpportunity) {
      setOpportunities(
        opportunities.filter((opp) => opp.id !== deleteOpportunity.id)
      );
      setDeleteOpportunity(null);
      setSelectedOpportunity(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="ml-3 text-3xl font-bold text-gray-900">
                Go1 Sales CRM
              </h1>
            </div>
            <button
              onClick={handleNewClick}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-800 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Opportunity
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {isCreating ? (
            <OpportunityDetails
              opportunity={createDefaultOpportunity()}
              onClose={() => setIsCreating(false)}
              onUpdate={handleCreateOpportunity}
              isNew={true}
            />
          ) : selectedOpportunity ? (
            <OpportunityDetails
              opportunity={selectedOpportunity}
              onClose={() => setSelectedOpportunity(null)}
              onUpdate={handleUpdateOpportunity}
              onDelete={handleDeleteClick}
              isNew={false}
            />
          ) : (
            <OpportunityTable
              opportunities={opportunities}
              onOpportunityClick={setSelectedOpportunity}
            />
          )}
        </div>
      </main>

      <ConfirmationModal
        isOpen={deleteOpportunity !== null}
        title="Delete Opportunity"
        message={`Are you sure you want to delete "${deleteOpportunity?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpportunity(null)}
      />
    </div>
  );
}

export default App;
