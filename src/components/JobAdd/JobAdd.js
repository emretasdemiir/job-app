import { useState } from 'react';

import './JobAdd.css';

import { Button, Input, Dropdown, Menu } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import TableData from '../TableData/TableData';

function JobAdd() {

  // Global states
  const [inputText, setInputText] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedValueKey, setSelectedValueKey] = useState(null)
  const [keyValue, setKeyValue] = useState(1)
  const [data, setData] = useState([])


  const textInput = (e) => {
    setInputText(e.target.value)
  }
  const valueSelect = (e) => {
    setSelectedValue(e.domEvent.target.innerText)
    setSelectedValueKey(e.key)
  }

  let initialData = [...data]

  const buttonClicked = (e) => {
    const dataToPush =
    {
      key: String(keyValue),
      name: inputText,
      priority: selectedValue,
      prioritykey: selectedValueKey
    }
    console.log(data)


    initialData.push(dataToPush)
    initialData.sort((a, b) => a.prioritykey - b.prioritykey)

    setData(initialData)
    setKeyValue(keyValue + 1)
    setInputText(null)
    setSelectedValue(null)
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
    <div className="job-add">
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
          <Button type="primary" onClick={(e) => buttonClicked(e)} disabled={(inputText && selectedValue) ? false : true} icon={<PlusOutlined />}>
            Create
          </Button>
        </div>
      </div>

      <TableData data={data} setData={setData} trigger={{}} />

    </div>
  );
}

export default JobAdd;
