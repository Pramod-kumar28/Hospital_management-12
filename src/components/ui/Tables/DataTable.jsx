// import React, { useState } from 'react'

// const DataTable = ({ 
//   columns = [], 
//   data = [], 
//   onRowClick,
//   selectable = false,
//   onSelectionChange 
// }) => {
//   const [selectedRows, setSelectedRows] = useState(new Set())
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

//   const handleSort = (key) => {
//     setSortConfig(current => ({
//       key,
//       direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
//     }))
//   }

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRows(new Set(data.map((_, index) => index)))
//       onSelectionChange?.(data)
//     } else {
//       setSelectedRows(new Set())
//       onSelectionChange?.([])
//     }
//   }

//   const handleSelectRow = (index, row) => {
//     const newSelected = new Set(selectedRows)
//     if (newSelected.has(index)) {
//       newSelected.delete(index)
//     } else {
//       newSelected.add(index)
//     }
//     setSelectedRows(newSelected)
//     onSelectionChange?.(Array.from(newSelected).map(i => data[i]))
//   }

//   const sortedData = React.useMemo(() => {
//     if (!sortConfig.key) return data

//     return [...data].sort((a, b) => {
//       const aValue = a[sortConfig.key]
//       const bValue = b[sortConfig.key]

//       if (aValue < bValue) {
//         return sortConfig.direction === 'asc' ? -1 : 1
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === 'asc' ? 1 : -1
//       }
//       return 0
//     })
//   }, [data, sortConfig])

//   return (
//     <div className="bg-white border rounded-lg overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {selectable && (
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.size === data.length && data.length > 0}
//                     onChange={handleSelectAll}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                 </th>
//               )}
//               {columns.map(column => (
//                 <th
//                   key={column.key}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   onClick={() => column.sortable && handleSort(column.key)}
//                 >
//                   <div className="flex items-center gap-1">
//                     {column.title}
//                     {column.sortable && (
//                       <i className={`fas fa-sort text-gray-400 text-xs ${
//                         sortConfig.key === column.key ? 'text-blue-500' : ''
//                       }`}></i>
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {sortedData.map((row, index) => (
//               <tr
//                 key={index}
//                 className={`hover:bg-gray-50 transition-colors ${
//                   onRowClick ? 'cursor-pointer' : ''
//                 } ${selectedRows.has(index) ? 'bg-blue-50' : ''}`}
//                 onClick={() => onRowClick?.(row)}
//               >
//                 {selectable && (
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <input
//                       type="checkbox"
//                       checked={selectedRows.has(index)}
//                       onChange={(e) => {
//                         e.stopPropagation()
//                         handleSelectRow(index, row)
//                       }}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                   </td>
//                 )}
//                 {columns.map(column => (
//                   <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {column.render ? column.render(row[column.key], row) : row[column.key]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {data.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           <i className="fas fa-inbox text-3xl mb-2"></i>
//           <p>No data available</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DataTable

















// import React, { useState } from 'react'

// const DataTable = ({ 
//   columns = [], 
//   data = [], 
//   onRowClick,
//   selectable = false,
//   onSelectionChange,
//   mobileCard = true // Add this prop to enable mobile card layout
// }) => {
//   const [selectedRows, setSelectedRows] = useState(new Set())
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

//   const handleSort = (key) => {
//     setSortConfig(current => ({
//       key,
//       direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
//     }))
//   }

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRows(new Set(data.map((_, index) => index)))
//       onSelectionChange?.(data)
//     } else {
//       setSelectedRows(new Set())
//       onSelectionChange?.([])
//     }
//   }

//   const handleSelectRow = (index, row) => {
//     const newSelected = new Set(selectedRows)
//     if (newSelected.has(index)) {
//       newSelected.delete(index)
//     } else {
//       newSelected.add(index)
//     }
//     setSelectedRows(newSelected)
//     onSelectionChange?.(Array.from(newSelected).map(i => data[i]))
//   }

//   const sortedData = React.useMemo(() => {
//     if (!sortConfig.key) return data

//     return [...data].sort((a, b) => {
//       const aValue = a[sortConfig.key]
//       const bValue = b[sortConfig.key]

//       if (aValue < bValue) {
//         return sortConfig.direction === 'asc' ? -1 : 1
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === 'asc' ? 1 : -1
//       }
//       return 0
//     })
//   }, [data, sortConfig])

//   // Mobile card view
//   if (mobileCard && window.innerWidth <= 768) {
//     return (
//       <div className="table-responsisve">
//         <div className="table-mobile-card">
//           {sortedData.map((row, index) => (
//             <div
//               key={index}
//               className="card card-mobile card-hover cursor-pointer"
//               onClick={() => onRowClick?.(row)}
//             >
//               {selectable && (
//                 <div className="flex items-center mb-3 p-2 border-b">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.has(index)}
//                     onChange={(e) => {
//                       e.stopPropagation()
//                       handleSelectRow(index, row)
//                     }}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className="ml-2 text-sm text-gray-600">Select</span>
//                 </div>
//               )}
              
//               {columns.map(column => (
//                 <div key={column.key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
//                   <span className="text-xs font-medium text-gray-500 uppercase">
//                     {column.title}
//                   </span>
//                   <span className="text-sm text-gray-900 text-right">
//                     {column.render ? column.render(row[column.key], row) : row[column.key]}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           ))}
          
//           {data.length === 0 && (
//             <div className="text-center py-8 text-gray-500">
//               <i className="fas fa-inbox text-3xl mb-2"></i>
//               <p>No data available</p>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   }

//   // Desktop table view
//   return (
//     <div className="table-responsive">
//       <table className="table">
//         <thead className="bg-gray-50">
//           <tr>
//             {selectable && (
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
//                 <input
//                   type="checkbox"
//                   checked={selectedRows.size === data.length && data.length > 0}
//                   onChange={handleSelectAll}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//               </th>
//             )}
//             {columns.map(column => (
//               <th
//                 key={column.key}
//                 className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                 onClick={() => column.sortable && handleSort(column.key)}
//               >
//                 <div className="flex items-center gap-1">
//                   {column.title}
//                   {column.sortable && (
//                     <i className={`fas fa-sort text-gray-400 text-xs ${
//                       sortConfig.key === column.key ? 'text-blue-500' : ''
//                     }`}></i>
//                   )}
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {sortedData.map((row, index) => (
//             <tr
//               key={index}
//               className={`hover:bg-gray-50 transition-colors ${
//                 onRowClick ? 'cursor-pointer' : ''
//               } ${selectedRows.has(index) ? 'bg-blue-50' : ''}`}
//               onClick={() => onRowClick?.(row)}
//             >
//               {selectable && (
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.has(index)}
//                     onChange={(e) => {
//                       e.stopPropagation()
//                       handleSelectRow(index, row)
//                     }}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                 </td>
//               )}
//               {columns.map(column => (
//                 <td key={column.key} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                   {column.render ? column.render(row[column.key], row) : row[column.key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {data.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           <i className="fas fa-inbox text-3xl mb-2"></i>
//           <p>No data available</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DataTable






























// import React, { useState } from 'react'

// const DataTable = ({ 
//   columns = [], 
//   data = [], 
//   onRowClick,
//   selectable = false,
//   onSelectionChange 
// }) => {
//   const [selectedRows, setSelectedRows] = useState(new Set())
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

//   const handleSort = (key) => {
//     setSortConfig(current => ({
//       key,
//       direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
//     }))
//   }

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRows(new Set(data.map((_, index) => index)))
//       onSelectionChange?.(data)
//     } else {
//       setSelectedRows(new Set())
//       onSelectionChange?.([])
//     }
//   }

//   const handleSelectRow = (index, row) => {
//     const newSelected = new Set(selectedRows)
//     if (newSelected.has(index)) {
//       newSelected.delete(index)
//     } else {
//       newSelected.add(index)
//     }
//     setSelectedRows(newSelected)
//     onSelectionChange?.(Array.from(newSelected).map(i => data[i]))
//   }

//   const sortedData = React.useMemo(() => {
//     if (!sortConfig.key) return data

//     return [...data].sort((a, b) => {
//       const aValue = a[sortConfig.key]
//       const bValue = b[sortConfig.key]

//       if (aValue < bValue) {
//         return sortConfig.direction === 'asc' ? -1 : 1
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === 'asc' ? 1 : -1
//       }
//       return 0
//     })
//   }, [data, sortConfig])

//   return (
//     <div className="table-responsive">
//       <table className="table">
//         <thead className="bg-gray-50">
//           <tr>
//             {selectable && (
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
//                 <input
//                   type="checkbox"
//                   checked={selectedRows.size === data.length && data.length > 0}
//                   onChange={handleSelectAll}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//               </th>
//             )}
//             {columns.map(column => (
//               <th
//                 key={column.key}
//                 className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                 onClick={() => column.sortable && handleSort(column.key)}
//               >
//                 <div className="flex items-center gap-1">
//                   {column.title}
//                   {column.sortable && (
//                     <i className={`fas fa-sort text-gray-400 text-xs ${
//                       sortConfig.key === column.key ? 'text-blue-500' : ''
//                     }`}></i>
//                   )}
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {sortedData.map((row, index) => (
//             <tr
//               key={index}
//               className={`hover:bg-gray-50 transition-colors ${
//                 onRowClick ? 'cursor-pointer' : ''
//               } ${selectedRows.has(index) ? 'bg-blue-50' : ''}`}
//               onClick={() => onRowClick?.(row)}
//             >
//               {selectable && (
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.has(index)}
//                     onChange={(e) => {
//                       e.stopPropagation()
//                       handleSelectRow(index, row)
//                     }}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                 </td>
//               )}
//               {columns.map(column => (
//                 <td key={column.key} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                   {column.render ? column.render(row[column.key], row) : row[column.key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {data.length === 0 && (
//         <div className="table-empty">
//           <i className="fas fa-inbox"></i>
//           <p>No data available</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DataTable















// import React, { useState } from 'react'

// const DataTable = ({ 
//   columns = [], 
//   data = [], 
//   onRowClick,
//   selectable = false,
//   onSelectionChange 
// }) => {
//   const [selectedRows, setSelectedRows] = useState(new Set())
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

//   const handleSort = (key) => {
//     setSortConfig(current => ({
//       key,
//       direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
//     }))
//   }

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRows(new Set(data.map((_, index) => index)))
//       onSelectionChange?.(data)
//     } else {
//       setSelectedRows(new Set())
//       onSelectionChange?.([])
//     }
//   }

//   const handleSelectRow = (index, row) => {
//     const newSelected = new Set(selectedRows)
//     if (newSelected.has(index)) {
//       newSelected.delete(index)
//     } else {
//       newSelected.add(index)
//     }
//     setSelectedRows(newSelected)
//     onSelectionChange?.(Array.from(newSelected).map(i => data[i]))
//   }

//   const sortedData = React.useMemo(() => {
//     if (!sortConfig.key) return data

//     return [...data].sort((a, b) => {
//       const aValue = a[sortConfig.key]
//       const bValue = b[sortConfig.key]

//       if (aValue < bValue) {
//         return sortConfig.direction === 'asc' ? -1 : 1
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === 'asc' ? 1 : -1
//       }
//       return 0
//     })
//   }, [data, sortConfig])

//   return (
//     <div className="relative overflow-x-auto">
//       <table className="table w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             {selectable && (
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12 sticky left-0 bg-gray-50 z-20">
//                 <input
//                   type="checkbox"
//                   checked={selectedRows.size === data.length && data.length > 0}
//                   onChange={handleSelectAll}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//               </th>
//             )}
//             {columns.map((column, index) => (
//               <th
//                 key={column.key}
//                 className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 sticky top-0 bg-gray-50 z-10 ${
//                   index === 0 ? 'sticky left-0 z-20 bg-gray-50' : ''
//                 } ${
//                   index === columns.length - 1 ? 'sticky right-0 z-20 bg-gray-50' : ''
//                 }`}
//                 onClick={() => column.sortable && handleSort(column.key)}
//               >
//                 <div className="flex items-center gap-1">
//                   {column.title}
//                   {column.sortable && (
//                     <i className={`fas fa-sort text-gray-400 text-xs ${
//                       sortConfig.key === column.key ? 'text-blue-500' : ''
//                     }`}></i>
//                   )}
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {sortedData.map((row, rowIndex) => (
//             <tr
//               key={rowIndex}
//               className={`hover:bg-gray-50 transition-colors ${
//                 onRowClick ? 'cursor-pointer' : ''
//               } ${selectedRows.has(rowIndex) ? 'bg-blue-50' : ''}`}
//               onClick={() => onRowClick?.(row)}
//             >
//               {selectable && (
//                 <td className="px-4 py-3 whitespace-nowrap sticky left-0 bg-white z-10">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.has(rowIndex)}
//                     onChange={(e) => {
//                       e.stopPropagation()
//                       handleSelectRow(rowIndex, row)
//                     }}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                 </td>
//               )}
//               {columns.map((column, colIndex) => (
//                 <td 
//                   key={column.key} 
//                   className={`px-4 py-3 whitespace-nowrap text-sm text-gray-900 ${
//                     colIndex === 0 ? 'sticky left-0 bg-white z-10 border-r border-gray-200' : ''
//                   } ${
//                     colIndex === columns.length - 1 ? 'sticky right-0 bg-white z-10 border-l border-gray-200' : ''
//                   }`}
//                 >
//                   {column.render ? column.render(row[column.key], row) : row[column.key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {data.length === 0 && (
//         <div className="table-empty">
//           <i className="fas fa-inbox"></i>
//           <p>No data available</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DataTable

















// import React, { useState } from 'react'

// const DataTable = ({ 
//   columns = [], 
//   data = [], 
//   onRowClick,
//   selectable = false,
//   onSelectionChange 
// }) => {
//   const [selectedRows, setSelectedRows] = useState(new Set())
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

//   const handleSort = (key) => {
//     setSortConfig(current => ({
//       key,
//       direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
//     }))
//   }

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRows(new Set(data.map((_, index) => index)))
//       onSelectionChange?.(data)
//     } else {
//       setSelectedRows(new Set())
//       onSelectionChange?.([])
//     }
//   }

//   const handleSelectRow = (index, row) => {
//     const newSelected = new Set(selectedRows)
//     if (newSelected.has(index)) {
//       newSelected.delete(index)
//     } else {
//       newSelected.add(index)
//     }
//     setSelectedRows(newSelected)
//     onSelectionChange?.(Array.from(newSelected).map(i => data[i]))
//   }

//   const sortedData = React.useMemo(() => {
//     if (!sortConfig.key) return data

//     return [...data].sort((a, b) => {
//       const aValue = a[sortConfig.key]
//       const bValue = b[sortConfig.key]

//       if (aValue < bValue) {
//         return sortConfig.direction === 'asc' ? -1 : 1
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === 'asc' ? 1 : -1
//       }
//       return 0
//     })
//   }, [data, sortConfig])

//   return (
//     <div className="relative overflow-x-auto">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             {selectable && (
//               <th scope="col" className="px-6 py-3 sticky left-0 bg-gray-50 dark:bg-gray-700 z-20">
//                 <input
//                   type="checkbox"
//                   checked={selectedRows.size === data.length && data.length > 0}
//                   onChange={handleSelectAll}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
//                 />
//               </th>
//             )}
//             {columns.map((column, index) => (
//               <th
//                 key={column.key}
//                 scope="col"
//                 className={`px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700 z-10 ${
//                   column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''
//                 } ${
//                   index === 0 ? 'sticky left-0 z-20 bg-gray-50 dark:bg-gray-700' : ''
//                 } ${
//                   index === columns.length - 1 ? 'sticky right-0 z-20 bg-gray-50 dark:bg-gray-700' : ''
//                 }`}
//                 onClick={() => column.sortable && handleSort(column.key)}
//               >
//                 <div className="flex items-center gap-1">
//                   {column.title}
//                   {column.sortable && (
//                     <i className={`fas fa-sort text-gray-400 text-xs ${
//                       sortConfig.key === column.key ? 'text-blue-500 dark:text-blue-400' : ''
//                     }`}></i>
//                   )}
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.map((row, rowIndex) => (
//             <tr 
//               key={rowIndex}
//               className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 ${
//                 onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600' : ''
//               } ${selectedRows.has(rowIndex) ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
//               onClick={() => onRowClick?.(row)}
//             >
//               {selectable && (
//                 <td className="px-6 py-4 sticky left-0 bg-white dark:bg-gray-800 z-10">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.has(rowIndex)}
//                     onChange={(e) => {
//                       e.stopPropagation()
//                       handleSelectRow(rowIndex, row)
//                     }}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
//                   />
//                 </td>
//               )}
//               {columns.map((column, colIndex) => (
//                 <td 
//                   key={column.key}
//                   className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ${
//                     colIndex === 0 ? 'sticky left-0 bg-white dark:bg-gray-800 z-10 border-r border-gray-200 dark:border-gray-600' : ''
//                   } ${
//                     colIndex === columns.length - 1 ? 'sticky right-0 bg-white dark:bg-gray-800 z-10 border-l border-gray-200 dark:border-gray-600' : ''
//                   }`}
//                 >
//                   {column.render ? column.render(row[column.key], row) : row[column.key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {data.length === 0 && (
//         <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//           <i className="fas fa-inbox text-3xl mb-2"></i>
//           <p>No data available</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DataTable

















import React, { useState } from 'react'
 
const DataTable = ({
  columns = [],
  data = [],
  onRowClick,
  selectable = false,
  onSelectionChange
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
 
  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }
 
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map((_, index) => index)))
      onSelectionChange?.(data)
    } else {
      setSelectedRows(new Set())
      onSelectionChange?.([])
    }
  }
 
  const handleSelectRow = (index, row) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedRows(newSelected)
    onSelectionChange?.(Array.from(newSelected).map(i => data[i]))
  }
 
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data
 
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
 
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])
 
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-center">
            <tr className='text-center'>
              {selectable && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 px-2 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.title}
                    {column.sortable && (
                      <i className={`fas fa-sort text-gray-400 text-xs ${
                        sortConfig.key === column.key ? 'text-blue-500' : ''
                      }`}></i>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                } ${selectedRows.has(index) ? 'bg-blue-50' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {selectable && (
                  <td className="px-6 py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(index)}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectRow(index, row)
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map(column => (
                  <td key={column.key} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-inbox text-3xl mb-2"></i>
          <p>No data available</p>
        </div>
      )}
    </div>
  )
}
 
export default DataTable