import React from 'react'

function MultiselectDropDown({ formFieldName, options }) {
  return (
    <>
    <label className="relative">
      <input type="checkbox" className="hidden peer" />
        {"Show the dropdown"}
      
      <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
        <ul>
          {options.map((option, i) => {
            return (
              <li key={i}>
                <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100">
                  <input
                    type="text"
                    name={formFieldName}
                    value={option.skill_name}
                    className="cursor-pointer"
                  />
                  <span className="ml-1">{option.skill_name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
    </>
  )
}

export default MultiselectDropDown