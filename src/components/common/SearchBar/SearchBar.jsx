import React, { useState } from 'react'

const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
  size = 'md',
  value: externalValue,
  onChange: externalOnChange,
  debounceDelay = 300,
  showClearButton = true,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('')
  const [timer, setTimer] = useState(null)
  
  const isControlled = externalValue !== undefined
  const value = isControlled ? externalValue : internalValue
  
  const handleChange = (e) => {
    const newValue = e.target.value
    
    if (!isControlled) {
      setInternalValue(newValue)
    }
    
    if (externalOnChange) {
      externalOnChange(newValue)
    }
    
    // Debounce the search
    if (timer) {
      clearTimeout(timer)
    }
    
    if (onSearch) {
      const newTimer = setTimeout(() => {
        onSearch(newValue)
      }, debounceDelay)
      setTimer(newTimer)
    }
  }
  
  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('')
    }
    
    if (externalOnChange) {
      externalOnChange('')
    }
    
    if (onSearch) {
      onSearch('')
    }
    
    if (timer) {
      clearTimeout(timer)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch && value) {
      onSearch(value)
    }
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className="fas fa-search text-gray-400"></i>
        </div>
        <input
          type="text"
          className={`block w-full pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${sizeClasses[size]}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {showClearButton && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        )}
      </div>
      {props.hint && (
        <p className="mt-1 text-xs text-gray-500">{props.hint}</p>
      )}
    </form>
  )
}

export default SearchBar