import { useState } from 'react';

import './TableFilter.css';

import { Button, Input, Dropdown, Menu } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';

function TableFilter({ data, setData, filteredData, setFilteredData, filterInputText, setFilterInputText, selectedKeyForFilter, setSelectedKeyForFilter }) {

  // Global states
  const [selectedValueForFilter, setSelectedValueForFilter] = useState(null)

  let initialData = [...data]
  let allFilteredData = []

  const filterTextInput = (e) => {
    setFilterInputText(e.target.value)

    if (e.target.value !== "" || selectedKeyForFilter !== "0") {
      if (initialData.length > 0) {
        for (let i = 0; i < initialData.length; i++) {
          if (initialData[i].name.includes(e.target.value) && (initialData[i].priority === selectedValueForFilter || selectedKeyForFilter === "0")) {
            allFilteredData.push(initialData[i])
          }
        }
      }

      if (allFilteredData.length > 0) {
        setFilteredData(allFilteredData)
      }
      else {
        setFilteredData("")
      }
    }

    else {
      setFilteredData([])
    }

  }

  const valueSelectForFilter = (e) => {
    if (initialData.length > 0) {
      for (let i = 0; i < initialData.length; i++) {
        if (initialData[i].prioritykey === e.key && (initialData[i].name.includes(filterInputText))) {
          allFilteredData.push(initialData[i])
        }
      }
    }
    setSelectedValueForFilter(e.domEvent.target.innerText)
    setSelectedKeyForFilter(e.key)

    if (allFilteredData.length > 0) {
      setFilteredData(allFilteredData)
    }

    else {
      if (e.key !== "0") {
        setFilteredData("")
      }
      else {
        setFilteredData(initialData)
      }
    }
  }

  const menuForFilter = (
    <Menu
      onClick={(e) => valueSelectForFilter(e)}
    >
      <Menu.Item key="0">
        Priority (all)
      </Menu.Item>
      <Menu.Item key="1">
        Urgent
      </Menu.Item>
      <Menu.Item key="2">
        Regular
      </Menu.Item>
      <Menu.Item key="3">
        Trivial
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="job-filter">

      <div className="filter-create-area">
        <div className="filter-text-input">
          <Input prefix={<SearchOutlined />} value={filterInputText} maxLength={255} onChange={(e) => filterTextInput(e)} />
        </div>
        <div className="filter-dropdown-area">
          <div className='filter-dropdown-button'>
            <Dropdown trigger="click" overlay={menuForFilter}>
              <Button>
                {selectedValueForFilter ? selectedValueForFilter : "Priority (all)"}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableFilter;
