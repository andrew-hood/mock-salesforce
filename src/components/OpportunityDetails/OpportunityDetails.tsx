import React, { useState } from 'react';
import { Opportunity } from '../../types/opportunity';
import { X, Save } from 'lucide-react';
import { InputField } from '../FormFields/InputField';
import { SelectField } from '../FormFields/SelectField';
import { TextAreaField } from '../FormFields/TextAreaField';

interface OpportunityDetailsProps {
  opportunity: Opportunity;
  onClose: () => void;
  onUpdate: (opportunity: Opportunity) => void;
}

const STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

export function OpportunityDetails({ opportunity, onClose, onUpdate }: OpportunityDetailsProps) {
  const [formData, setFormData] = useState(opportunity);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate({
      ...formData,
      updatedAt: new Date().toISOString()
    });
    setIsEditing(false);
  };

  const handleChange = (field: keyof Opportunity, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'amount' || field === 'probability' ? Number(value) : value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save size={20} className="mr-2" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-blue-600 hover:text-blue-700"
            >
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {isEditing ? (
          <>
            <InputField
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(value) => handleChange('amount', value)}
            />
            <SelectField
              label="Stage"
              value={formData.stage}
              options={STAGES}
              onChange={(value) => handleChange('stage', value)}
            />
            <InputField
              label="Probability"
              type="number"
              value={formData.probability}
              onChange={(value) => handleChange('probability', value)}
            />
            <InputField
              label="Close Date"
              type="date"
              value={formData.closeDate}
              onChange={(value) => handleChange('closeDate', value)}
            />
            <InputField
              label="Account"
              value={formData.account}
              onChange={(value) => handleChange('account', value)}
            />
            <InputField
              label="Owner"
              value={formData.owner}
              onChange={(value) => handleChange('owner', value)}
            />
            <TextAreaField
              label="Description"
              value={formData.description || ''}
              onChange={(value) => handleChange('description', value)}
              className="col-span-2"
            />
          </>
        ) : (
          <>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Amount</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(formData.amount)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Stage</h3>
              <p className="mt-1">
                <span className={`px-2 py-1 text-sm font-semibold rounded-full
                  ${formData.stage === 'Closed Won' ? 'bg-green-100 text-green-800' : 
                    formData.stage === 'Closed Lost' ? 'bg-red-100 text-red-800' : 
                    'bg-blue-100 text-blue-800'}`}>
                  {formData.stage}
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Probability</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{formData.probability}%</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Close Date</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(formData.closeDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Account</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{formData.account}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Owner</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{formData.owner}</p>
            </div>
            {formData.description && (
              <div className="col-span-2 mt-6">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">{formData.description}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}