import { useState, useEffect } from 'react';

import './AddJob.css';

import { Button, Input, Dropdown, Menu } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import TableFilter from '../TableFilter/TableFilter';
import TableData from '../TableData/TableData';

function AddJob() {

  // Global states
  const [inputText, setInputText] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedValueKey, setSelectedValueKey] = useState(null)
  const [keyValue, setKeyValue] = useState(1)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filterInputText, setFilterInputText] = useState("")
  const [selectedKeyForFilter, setSelectedKeyForFilter] = useState("0")

  useEffect(() => {
    // In order to get datas from localStorage at the beginning
    const tableDatasFromLocalStorage = JSON.parse(window.localStorage.getItem('tableDatas'));

    if (tableDatasFromLocalStorage) {
      setData(tableDatasFromLocalStorage)
    }
  }, [])

  useEffect(() => {
    // In order to set datas to localStorage for added values
    if (data.length > 0) {
      window.localStorage.setItem('tableDatas', JSON.stringify(data));
    }

  }, [data])

  const textInput = (e) => {
    setInputText(e.target.value)
  }
  const valueSelect = (e) => {
    setSelectedValue(e.domEvent.target.innerText)
    setSelectedValueKey(e.key)
  }


  const buttonClicked = () => {
    let initialData = [...data]
    let newFilteredData = [...filteredData]
    let containsText

    // debugger

    const dataToPush =
    {
      key: String(keyValue),
      name: inputText,
      priority: selectedValue,
      prioritykey: selectedValueKey
    }

    initialData.push(dataToPush)
    initialData.sort((a, b) => a.prioritykey - b.prioritykey)

    if (filterInputText !== "" || selectedKeyForFilter !== "0") {
      containsText = newFilteredData.every(element => {
        return (element.name.includes(inputText) || element.prioritykey === selectedKeyForFilter)
      })

      if (containsText) {
        newFilteredData.push(dataToPush)
        setFilteredData(newFilteredData)
      }
    }

    setData(initialData)
    setKeyValue(keyValue + 1)
    setInputText(null)
    setSelectedValue(null)

    if (data.length === 0) {
      window.localStorage.setItem('tableDatas', JSON.stringify(data));
    }
  }

  const menu = (
    <Menu
      onClick={(e) => valueSelect(e)}
    >
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
    <div className="add-job">
      <span className='header-area' style={{ fontWeight: "bold" }}>Create New Job</span>

      <div className="create-area">
        <div className="add-text-input">
          <span style={{ fontSize: "10px", color: "gray" }}>Job Name</span>
          <Input value={inputText} maxLength={255} onChange={(e) => textInput(e)} />
        </div>
        <div className="dropdown-area">
          <span style={{ fontSize: "10px", color: "gray" }}>Job Priority</span>
          <div className='dropdown-button'>
            <Dropdown trigger="click" overlay={menu}>
              <Button>
                {selectedValue ? selectedValue : "Choose"}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className="create-button">
          <Button type="primary" onClick={() => buttonClicked()} disabled={(inputText && selectedValue) ? false : true} icon={<PlusOutlined />}>
            Create
          </Button>
        </div>
      </div>
      <div className="table">
        <div className='table-header'>Job List</div>
        <TableFilter data={data} setFilteredData={setFilteredData} filterInputText={filterInputText} setFilterInputText={setFilterInputText} selectedKeyForFilter={selectedKeyForFilter} setSelectedKeyForFilter={setSelectedKeyForFilter} />

        <TableData data={data} filteredData={filteredData} setData={setData} setFilteredData={setFilteredData} selectedKeyForFilter={selectedKeyForFilter} />
      </div>
    </div>
  );
}

export default AddJob;
