import { useState, useEffect } from 'react';

import './TableData.css'
import EditModal from '../EditModal/EditModal';
import DeleteModal from '../DeleteModal/DeleteModal';

import { Table, Tag, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function TableData({ data, filteredData, setData, setFilteredData, selectedKeyForFilter, setSelectedKeyForFilter, trigger }) {
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [cellKeyForEdit, setCellKeyForEdit] = useState(null)

  const handleEdit = (key) => {
    setEditModalVisible(true)
    setCellKeyForEdit(key)
  }

  const handleDelete = (key) => {
    setDeleteModalVisible(true)
    setCellKeyForEdit(key)
  }

  useEffect(() => {
    if (data) {
      setData(data)
    }
  }, [data, setData, trigger])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <div>{text}</div>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      sorter: (a, b) => a.prioritykey - b.prioritykey,
      sortDirections: ['ascend', 'descend'],
      render: priority =>
        <Tag style={{ fontWeight: "500" }} color={priority === "Urgent" ? "#e83d6d" :
          priority === "Regular" ? "#f1a824" : priority === "Trivial" && "#2277e0"}>{priority}</Tag>
      ,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Button onClick={() => handleEdit(text.key)} size="small"><EditOutlined /></Button>
          <Button onClick={() => handleDelete(text.key)} size="small"><DeleteOutlined /></Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Table dataSource={filteredData.length > 0 ? filteredData : filteredData === "" ? [] : data} columns={columns} />

      <EditModal
        data={data}
        filteredData={filteredData}
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        cellKeyForEdit={cellKeyForEdit}
        setData={setData}
        setFilteredData={setFilteredData}
        selectedKeyForFilter={selectedKeyForFilter}
        setSelectedKeyForFilter={setSelectedKeyForFilter} />

      <DeleteModal
        data={data}
        filteredData={filteredData}
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        cellKeyForEdit={cellKeyForEdit}
        setData={setData}
        setFilteredData={setFilteredData} />
    </div>
  );
}

export default TableData;