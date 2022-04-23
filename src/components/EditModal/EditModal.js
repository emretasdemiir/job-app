import { useState, useEffect } from 'react';

import './EditModal.css';

import { Modal, Button, Dropdown, Menu, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';



function EditModal({ data, filteredData, editModalVisible, setEditModalVisible, cellKeyForEdit, setData, setFilteredData, selectedKeyForFilter, setSelectedKeyForFilter }) {

  const [editModalName, setEditModalName] = useState(null)
  const [editModalDropdown, setEditModalDropdown] = useState(null)
  const [editModalDropdownKey, setEditModalDropdownKey] = useState(null)

  const foundDataForEditModal = data.find(element => element.key === cellKeyForEdit)
  const foundDataForEditModalIndex = data.findIndex(element => element.key === cellKeyForEdit)

  const handleSave = () => {
    const newData = [...data]
    const newFilteredData = [...filteredData]
    let foundDataForEditFilterIndex

    const newDataToPush = {
      key: foundDataForEditModal.key,
      name: foundDataForEditModal.name,
      priority: editModalDropdown,
      prioritykey: editModalDropdownKey,

    }

    newData.splice(foundDataForEditModalIndex, 1)
    newData.push(newDataToPush)
    newData.sort((a, b) => a.prioritykey - b.prioritykey)

    if (newFilteredData.length > 0) {
      foundDataForEditFilterIndex = newFilteredData.findIndex(element => element.key === cellKeyForEdit)

      newFilteredData.splice(foundDataForEditFilterIndex, 1)

      if (editModalDropdownKey !== "0" && editModalDropdownKey === selectedKeyForFilter)
        newFilteredData.push(newDataToPush)
      newFilteredData.sort((a, b) => a.prioritykey - b.prioritykey || a.key - b.key)

      if (newFilteredData.length > 0) {
        setFilteredData(newFilteredData)
      }
      else {
        setFilteredData("")
      }
    }
    setData(newData)
    setEditModalVisible(false)

  }

  const handleCancel = () => {
    setEditModalDropdown(foundDataForEditModal.priority)
    setEditModalDropdownKey(foundDataForEditModal.prioritykey)
    setEditModalVisible(false)
  }

  const valueSelect = (e) => {
    setEditModalDropdown(e.domEvent.target.innerText)
    setEditModalDropdownKey(e.key)
  }

  useEffect(() => {
    if (foundDataForEditModal) {
      setEditModalName(foundDataForEditModal.name)
      setEditModalDropdown(foundDataForEditModal.priority)
      setEditModalDropdownKey(foundDataForEditModal.prioritykey)
    }
  }, [cellKeyForEdit, data, foundDataForEditModal])

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
    <div className="edit-modal">
      <Modal title={"Job Edit"} centered visible={editModalVisible} onOk={handleSave} onCancel={handleCancel}>
        <div style={{ marginBottom: "25px" }}>
          <div style={{ fontSize: "10px", color: "gray" }}>Job Name</div>
          <Input value={editModalName} disabled={true} />
        </div>
        <div className="dropdown-area">
          <div style={{ fontSize: "10px", color: "gray" }}>Job Priority</div>
          <div className='dropdown-button'>
            <Dropdown trigger="click" overlay={menu}>
              <Button>
                {editModalDropdown}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditModal;
