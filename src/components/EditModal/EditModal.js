import { useState, useEffect } from 'react';

import './EditModal.css';

import { Modal, Button, Dropdown, Menu, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';



function EditModal({ data, editModalVisible, setEditModalVisible, cellKeyForEdit, setData }) {

  const [editModalName, setEditModalName] = useState(null)
  const [editModalDropdown, setEditModalDropdown] = useState(null)
  const [editModalDropdownKey, setEditModalDropdownKey] = useState(null)

  const foundDataForEditModal = data.find(element => element.key === cellKeyForEdit)
  const foundDataForEditModalIndex = data.findIndex(element => element.key === cellKeyForEdit)

  const handleSave = (e) => {
    const newData = [...data]

    const newDataToPush = {
      key: foundDataForEditModal.key,
      name: foundDataForEditModal.name,
      priority: editModalDropdown,
      prioritykey: editModalDropdownKey,

    }

    newData.splice(foundDataForEditModalIndex, 1)
    newData.push(newDataToPush)
    newData.sort((a, b) => a.prioritykey - b.prioritykey)

    setData(newData)
    setEditModalVisible(false)

  }

  const handleCancel = (e) => {

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
      <Modal title={"Job Edit"} centered visible={editModalVisible} onOk={(e) => handleSave(e)} onCancel={handleCancel}>
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
