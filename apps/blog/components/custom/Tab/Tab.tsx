import React, { useState } from 'react'

const Tab = () => {
  const [tabs, setTabs] = useState([
    { id: 'tab-1', title: 'Settings', icon: '⚙️', active: true, component: <div>Settings</div> },
    { id: 'tab-2', title: 'New Tab', active: false },
  ])

  const activateTab = (tabId) => {
    setTabs(
      tabs.map((tab) => ({
        ...tab,
        active: tab.id === tabId,
      }))
    )
  }

  const closeTab = (tabId, e) => {
    e.stopPropagation()
    if (tabs.length <= 1) return

    const newTabs = tabs.filter((tab) => tab.id !== tabId)

    // If we're closing the active tab, activate another
    if (tabs.find((tab) => tab.id === tabId)?.active) {
      newTabs[0].active = true
    }

    setTabs(newTabs)
  }

  const addTab = () => {
    const newTabId = `tab-${Date.now()}`

    setTabs([
      ...tabs.map((tab) => ({ ...tab, active: false })),
      {
        id: newTabId,
        title: `New Tab`,
        active: true,
      },
    ])
  }

  return (
    <div className="mx-auto my-8 w-full max-w-2xl">
      {/* Background */}
      <div>
        {/* Tab Container */}
        <div className="flex">
          {/* Tabs */}
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`relative cursor-pointer`}
              onClick={() => activateTab(tab.id)}
              style={{ zIndex: tab.active ? 10 : 5 - index }}
            >
              {/* Tab shape with CSS */}
              <div
                className={`relative flex h-10 items-center px-4 ${tab.active ? 'bg-white text-gray-800' : 'bg-gray-200/80 text-gray-700'} ${index > 0 ? '-ml-5' : ''} `}
                style={{
                  clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
                  paddingLeft: index > 0 ? '24px' : '16px',
                }}
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                <span className="max-w-xs truncate font-medium">{tab.title}</span>
                <button
                  className="ml-4 flex h-5 w-5 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300/30"
                  onClick={(e) => closeTab(tab.id, e)}
                >
                  ✕
                </button>
              </div>
            </button>
          ))}

          {/* Add Tab Button */}
          <button
            className="ml-2 flex h-10 w-8 cursor-pointer items-center justify-center rounded-tr bg-gray-100/30"
            onClick={addTab}
          >
            <span className="text-lg text-white">+</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="h-64 rounded-b border-t-0 bg-white p-4">
          <h2 className="text-lg font-medium">{tabs.find((tab) => tab.active)?.title} Content</h2>
          <p className="mt-2 text-gray-600">afsd</p>
        </div>
      </div>
    </div>
  )
}

export default Tab
