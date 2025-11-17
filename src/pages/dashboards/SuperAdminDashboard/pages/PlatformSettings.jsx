import React, { useState } from 'react'
import Modal from '../../../../components/common/Modal/Modal'

const PlatformSettings = () => {
  const [settings, setSettings] = useState({
    pricingPlans: [
      { name: 'Basic', price: 499, features: ['Up to 50 patients', 'Basic reports', 'Email support'] },
      { name: 'Professional', price: 999, features: ['Up to 200 patients', 'Advanced analytics', 'Priority support'] },
      { name: 'Enterprise', price: 1999, features: ['Unlimited patients', 'Custom reports', '24/7 dedicated support'] }
    ],
    featureToggles: {
      telemedicine: true,
      labIntegration: false,
      billingModule: true,
      inventory: false
    },
    emailTemplates: {
      welcome: 'Welcome to MediCloud! Your account has been created.',
      subscriptionRenewal: 'Your subscription is due for renewal.',
      paymentConfirmation: 'Your payment has been processed successfully.'
    }
  })

  // Modal states
  const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false)
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false)
  const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false)
  
  // Form states
  const [editingPlan, setEditingPlan] = useState(null)
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    features: ['']
  })
  const [editingEmail, setEditingEmail] = useState({ template: '', content: '' })

  // Feature Toggle Function
  const toggleFeature = (feature) => {
    setSettings(prev => ({
      ...prev,
      featureToggles: {
        ...prev.featureToggles,
        [feature]: !prev.featureToggles[feature]
      }
    }))
    alert(`⚙️ ${feature} feature ${!settings.featureToggles[feature] ? 'enabled' : 'disabled'}`)
  }

  // Plan Management Functions
  const editPlan = (planName) => {
    const plan = settings.pricingPlans.find(p => p.name === planName)
    setEditingPlan(plan)
    setIsEditPlanModalOpen(true)
  }

  const closeEditPlanModal = () => {
    setIsEditPlanModalOpen(false)
    setEditingPlan(null)
  }

  const handleUpdatePlan = (e) => {
    e.preventDefault()
    if (!editingPlan) return

    const updatedPlans = settings.pricingPlans.map(plan =>
      plan.name === editingPlan.name ? editingPlan : plan
    )
    
    setSettings(prev => ({
      ...prev,
      pricingPlans: updatedPlans
    }))
    
    alert(`✅ ${editingPlan.name} plan updated successfully!`)
    closeEditPlanModal()
  }

  const handlePlanInputChange = (field, value) => {
    setEditingPlan(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePlanFeatureChange = (index, value) => {
    const updatedFeatures = [...editingPlan.features]
    updatedFeatures[index] = value
    setEditingPlan(prev => ({
      ...prev,
      features: updatedFeatures
    }))
  }

  const addFeatureField = () => {
    setEditingPlan(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    const updatedFeatures = editingPlan.features.filter((_, i) => i !== index)
    setEditingPlan(prev => ({
      ...prev,
      features: updatedFeatures
    }))
  }

  // Add New Plan Functions
  const openAddPlanModal = () => {
    setNewPlan({
      name: '',
      price: '',
      features: ['']
    })
    setIsAddPlanModalOpen(true)
  }

  const closeAddPlanModal = () => {
    setIsAddPlanModalOpen(false)
    setNewPlan({
      name: '',
      price: '',
      features: ['']
    })
  }

  const handleAddPlan = (e) => {
    e.preventDefault()
    
    if (!newPlan.name || !newPlan.price) {
      alert('Please fill in all required fields')
      return
    }

    const plan = {
      name: newPlan.name,
      price: parseInt(newPlan.price),
      features: newPlan.features.filter(feature => feature.trim() !== '')
    }

    setSettings(prev => ({
      ...prev,
      pricingPlans: [...prev.pricingPlans, plan]
    }))

    alert(`✅ ${plan.name} plan added successfully!`)
    closeAddPlanModal()
  }

  const handleNewPlanInputChange = (field, value) => {
    setNewPlan(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNewPlanFeatureChange = (index, value) => {
    const updatedFeatures = [...newPlan.features]
    updatedFeatures[index] = value
    setNewPlan(prev => ({
      ...prev,
      features: updatedFeatures
    }))
  }

  const addNewFeatureField = () => {
    setNewPlan(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeNewFeature = (index) => {
    const updatedFeatures = newPlan.features.filter((_, i) => i !== index)
    setNewPlan(prev => ({
      ...prev,
      features: updatedFeatures
    }))
  }

  // Email Template Functions
  const editEmailTemplate = (template) => {
    setEditingEmail({
      template: template,
      content: settings.emailTemplates[template]
    })
    setIsEditEmailModalOpen(true)
  }

  const closeEditEmailModal = () => {
    setIsEditEmailModalOpen(false)
    setEditingEmail({ template: '', content: '' })
  }

  const handleUpdateEmailTemplate = (e) => {
    e.preventDefault()
    
    setSettings(prev => ({
      ...prev,
      emailTemplates: {
        ...prev.emailTemplates,
        [editingEmail.template]: editingEmail.content
      }
    }))

    alert(`✅ ${editingEmail.template} template updated successfully!`)
    closeEditEmailModal()
  }

  const deletePlan = (planName) => {
    if (confirm(`Are you sure you want to delete the ${planName} plan?`)) {
      setSettings(prev => ({
        ...prev,
        pricingPlans: prev.pricingPlans.filter(p => p.name !== planName)
      }))
      alert(`🗑️ ${planName} plan deleted`)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">
        <i className="fas fa-cogs text-blue-500 mr-2"></i>Platform Settings
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Plans */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <h3 className="font-semibold text-lg mb-4">Pricing Plans</h3>
          <div className="space-y-4">
            {settings.pricingPlans.map(plan => (
              <div key={plan.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{plan.name}</h4>
                  <span className="text-xl font-bold text-blue-600">₹{plan.price}/month</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 mb-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <i className="fas fa-check text-green-500"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button 
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                    onClick={() => editPlan(plan.name)}
                  >
                    Edit Plan
                  </button>
                  <button 
                    className="flex-1 bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-700 transition-colors"
                    onClick={() => deletePlan(plan.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button 
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
              onClick={openAddPlanModal}
            >
              <i className="fas fa-plus mr-2"></i>Add New Plan
            </button>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <h3 className="font-semibold text-lg mb-4">Feature Toggles</h3>
          <div className="space-y-4">
            {Object.entries(settings.featureToggles).map(([feature, enabled]) => (
              <div key={feature} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{feature.charAt(0).toUpperCase() + feature.slice(1)}</div>
                  <div className="text-xs text-gray-500">Enable/disable {feature} module</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={enabled}
                    onChange={() => toggleFeature(feature)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>

          {/* Email Templates */}
          <h3 className="font-semibold text-lg mb-4 mt-6">Email Templates</h3>
          <div className="space-y-3">
            {Object.entries(settings.emailTemplates).map(([template, content]) => (
              <div key={template} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{template.charAt(0).toUpperCase() + template.slice(1)} Template</h4>
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    onClick={() => editEmailTemplate(template)}
                  >
                    <i className="fas fa-edit mr-1"></i>Edit
                  </button>
                </div>
                <p className="text-sm text-gray-600 truncate">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Plan Modal */}
      <Modal
        isOpen={isEditPlanModalOpen}
        onClose={closeEditPlanModal}
        title={`Edit ${editingPlan?.name} Plan`}
        size="lg"
      >
        {editingPlan && (
          <form onSubmit={handleUpdatePlan} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => handlePlanInputChange('name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  value={editingPlan.price}
                  onChange={(e) => handlePlanInputChange('price', parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features *
              </label>
              <div className="space-y-2">
                {editingPlan.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handlePlanFeatureChange(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Feature ${index + 1}`}
                      required
                    />
                    {editingPlan.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeatureField}
                  className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700 transition-colors"
                >
                  <i className="fas fa-plus"></i>
                  Add Feature
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={closeEditPlanModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Update Plan
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Add New Plan Modal */}
      <Modal
        isOpen={isAddPlanModalOpen}
        onClose={closeAddPlanModal}
        title="Add New Pricing Plan"
        size="lg"
      >
        <form onSubmit={handleAddPlan} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Name *
              </label>
              <input
                type="text"
                value={newPlan.name}
                onChange={(e) => handleNewPlanInputChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Premium"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                value={newPlan.price}
                onChange={(e) => handleNewPlanInputChange('price', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 1499"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features *
            </label>
            <div className="space-y-2">
              {newPlan.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleNewPlanFeatureChange(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Feature ${index + 1}`}
                    required
                  />
                  {newPlan.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNewFeature(index)}
                      className="px-3 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addNewFeatureField}
                className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700 transition-colors"
              >
                <i className="fas fa-plus"></i>
                Add Feature
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={closeAddPlanModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Plan
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Email Template Modal */}
      <Modal
        isOpen={isEditEmailModalOpen}
        onClose={closeEditEmailModal}
        title={`Edit ${editingEmail.template?.charAt(0).toUpperCase() + editingEmail.template?.slice(1)} Email Template`}
        size="lg"
      >
        <form onSubmit={handleUpdateEmailTemplate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template Content *
            </label>
            <textarea
              value={editingEmail.content}
              onChange={(e) => setEditingEmail(prev => ({ ...prev, content: e.target.value }))}
              rows="8"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Enter email template content..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={closeEditEmailModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Template
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default PlatformSettings