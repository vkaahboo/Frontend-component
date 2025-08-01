import React from 'react'

const TaskStatusTabs = ({tabs, activeTab, setActiveTab}) => {



  return (
    <div className="">
        <div className="">
            {tabs.map((tab) => (
                <button
                key={tab.label}
                className={`relative px-3 md:px-4 py-2 text-sm font-medium ${
                    activeTab === tab.label
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                } cursor-pointer`}
                onClick={() => setActiveTab(tab.label)}
                >
                    <div className="">
                        <span className="text-xs">{tab.label}</span>
                        <span
                        className=
                        ></span>
                    </div>
                </button>
            ))}
        </div>
    </div>
  )
}

export default TaskStatusTabs