import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const DatabaseManagement = () => {
  const [loading, setLoading] = useState(true)
  const [databaseInfo, setDatabaseInfo] = useState({})
  const [backups, setBackups] = useState([])

  useEffect(() => {
    loadDatabaseInfo()
  }, [])

  const loadDatabaseInfo = async () => {
    setLoading(true)
    setTimeout(() => {
      setDatabaseInfo({
        version: 'MySQL 8.0',
        size: '2.4 GB',
        tables: 45,
        connections: 28,
        uptime: '15 days, 6 hours',
        performance: 'Optimal'
      })
      
      setBackups([
        { id: 'BK-001', name: 'backup_20240115.sql', size: '1.2 GB', date: '2024-01-15 02:00 AM', type: 'Automatic', status: 'Completed' },
        { id: 'BK-002', name: 'backup_20240114.sql', size: '1.1 GB', date: '2024-01-14 02:00 AM', type: 'Automatic', status: 'Completed' },
        { id: 'BK-003', name: 'backup_20240113.sql', size: '1.1 GB', date: '2024-01-13 02:00 AM', type: 'Automatic', status: 'Completed' },
        { id: 'BK-004', name: 'manual_backup_20240112.sql', size: '1.2 GB', date: '2024-01-12 11:30 AM', type: 'Manual', status: 'Completed' }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleBackup = () => {
    // In real app, this would trigger backup
    console.log('Starting manual backup...')
    alert('Manual backup initiated! This may take a few minutes.')
  }

  const handleOptimize = () => {
    // In real app, this would optimize database
    console.log('Optimizing database...')
    alert('Database optimization started!')
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Database Management</h2>

      {/* Database Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Database Version</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">{databaseInfo.version}</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-database text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Database Size</div>
              <div className="text-2xl font-bold text-green-600 mt-1">{databaseInfo.size}</div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-hdd text-green-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Active Tables</div>
              <div className="text-2xl font-bold text-purple-600 mt-1">{databaseInfo.tables}</div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <i className="fas fa-table text-purple-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Active Connections</div>
              <div className="text-2xl font-bold text-orange-600 mt-1">{databaseInfo.connections}</div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <i className="fas fa-plug text-orange-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Uptime</div>
              <div className="text-2xl font-bold text-indigo-600 mt-1">{databaseInfo.uptime}</div>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <i className="fas fa-clock text-indigo-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Performance</div>
              <div className="text-2xl font-bold text-teal-600 mt-1">{databaseInfo.performance}</div>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <i className="fas fa-tachometer-alt text-teal-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded border card-shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Database Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={handleBackup}
            className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center"
          >
            <i className="fas fa-save text-blue-600 text-xl mb-2"></i>
            <p className="font-medium">Backup Now</p>
          </button>
          <button 
            onClick={handleOptimize}
            className="p-4 border rounded-lg hover:bg-green-50 transition-colors text-center"
          >
            <i className="fas fa-broom text-green-600 text-xl mb-2"></i>
            <p className="font-medium">Optimize DB</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors text-center">
            <i className="fas fa-search text-yellow-600 text-xl mb-2"></i>
            <p className="font-medium">Run Query</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-red-50 transition-colors text-center">
            <i className="fas fa-trash text-red-600 text-xl mb-2"></i>
            <p className="font-medium">Clean Logs</p>
          </button>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-xl card-shadow border overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Backup History</h3>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              { key: 'name', title: 'Backup Name', sortable: true },
              { key: 'size', title: 'Size', sortable: true },
              { key: 'date', title: 'Date', sortable: true },
              { 
                key: 'type', 
                title: 'Type', 
                sortable: true,
                render: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    value === 'Automatic' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {value}
                  </span>
                )
              },
              { 
                key: 'status', 
                title: 'Status', 
                sortable: true,
                render: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    value === 'Completed' ? 'status-confirmed' : 'status-pending'
                  }`}>
                    {value}
                  </span>
                )
              },
              {
                key: 'actions',
                title: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800" title="Download">
                      <i className="fas fa-download"></i>
                    </button>
                    <button className="text-green-600 hover:text-green-800" title="Restore">
                      <i className="fas fa-undo"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800" title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )
              }
            ]}
            data={backups}
          />
        </div>
      </div>

      {/* Database Health Status */}
      <div className="bg-white p-4 border rounded card-shadow mt-6">
        <h3 className="text-lg font-semibold mb-3">Database Health Status</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Storage Usage</span>
              <span>72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-yellow-600" style={{ width: '72%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Query Performance</span>
              <span>88%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-green-600" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Connection Efficiency</span>
              <span>95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-green-600" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatabaseManagement