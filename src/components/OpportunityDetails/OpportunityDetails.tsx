import React, { useState } from "react";
import { Opportunity } from "../../types/opportunity";
import { X, Save, Trash2 } from "lucide-react";
import { InputField } from "../FormFields/InputField";
import { SelectField } from "../FormFields/SelectField";
import { TextAreaField } from "../FormFields/TextAreaField";

interface OpportunityDetailsProps {
  opportunity: Opportunity;
  onClose: () => void;
  onUpdate: (opportunity: Opportunity) => void;
  onDelete?: (opportunity: Opportunity) => void;
  isNew?: boolean;
}

const STAGES = [
  "Prospecting",
  "Qualification",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

export function OpportunityDetails({
  opportunity,
  onClose,
  onUpdate,
  onDelete,
  isNew = false,
}: OpportunityDetailsProps) {
  const [formData, setFormData] = useState(opportunity);
  const [isEditing, setIsEditing] = useState(isNew);

  const handleSave = () => {
    onUpdate({
      ...formData,
      updatedAt: new Date().toISOString(),
    });
    if (!isNew) {
      setIsEditing(false);
    }
  };

  const handleChange = (field: keyof Opportunity, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        field === "amount" || field === "portalId" ? Number(value) : value,
    }));
  };

  const isValid = formData.name && formData.account && formData.amount > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter opportunity name"
              className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">
              {formData.name}
            </h2>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={!isValid}
              className={`flex items-center px-4 py-2 rounded-md ${
                isValid
                  ? "bg-teal-800 text-white hover:bg-teal-900"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Save size={20} className="mr-2" />
              {isNew ? "Create" : "Save"}
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-teal-800 hover:text-teal-900"
              >
                Edit
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(formData)}
                  className="px-4 py-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </>
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
              onChange={(value) => handleChange("amount", value)}
            />
            <SelectField
              label="Stage"
              value={formData.stage}
              options={STAGES}
              onChange={(value) => handleChange("stage", value)}
            />
            <InputField
              label="Portal ID"
              type="number"
              value={formData.portalId}
              onChange={(value) => handleChange("portalId", value)}
            />
            <InputField
              label="Close Date"
              type="date"
              value={formData.closeDate}
              onChange={(value) => handleChange("closeDate", value)}
            />
            <InputField
              label="Account"
              value={formData.account}
              onChange={(value) => handleChange("account", value)}
            />
            <InputField
              label="Plan ID"
              value={formData.planId}
              onChange={(value) => handleChange("planId", value)}
            />
            <TextAreaField
              label="Description"
              value={formData.description || ""}
              onChange={(value) => handleChange("description", value)}
              className="col-span-2"
            />
          </>
        ) : (
          <>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Amount</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(formData.amount)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Stage</h3>
              <p className="mt-1">
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded-full
                  ${
                    formData.stage === "Closed Won"
                      ? "bg-green-100 text-green-800"
                      : formData.stage === "Closed Lost"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {formData.stage}
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Portal ID</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formData.portalId}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Close Date</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(formData.closeDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Account</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formData.account}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Plan ID</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formData.planId}
              </p>
            </div>
            {formData.description && (
              <div className="col-span-2 mt-6">
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1 text-gray-900">{formData.description}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
