import './DeleteModal.css';

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';



function DeleteModal({ data, filteredData, deleteModalVisible, setDeleteModalVisible, cellKeyForEdit, setData, setFilteredData }) {

  const foundDataForDeleteModalIndex = data.findIndex(element => element.key === cellKeyForEdit)

  const handleDelete = () => {
    const newData = [...data]
    const newFilteredData = [...filteredData]
    let foundDataForDeleteFilterIndex

    newData.splice(foundDataForDeleteModalIndex, 1)
    newData.sort((a, b) => a.prioritykey - b.prioritykey)

    if (newFilteredData.length > 0) {
      foundDataForDeleteFilterIndex = newFilteredData.findIndex(element => element.key === cellKeyForEdit)

      newFilteredData.splice(foundDataForDeleteFilterIndex, 1)
      newFilteredData.sort((a, b) => a.prioritykey - b.prioritykey)

      if (newFilteredData.length > 0) {
        setFilteredData(newFilteredData)
      }
      else {
        setFilteredData("")
      }
    }

    setData(newData)
    setDeleteModalVisible(false)

  }

  const handleCancel = () => {
    setDeleteModalVisible(false)
  }

  return (
    <div>
      <Modal
        title={false}
        centered
        visible={deleteModalVisible}
        okText={"Yes"}
        cancelText={"No"}
        okType={"danger ghost"}
        onOk={handleDelete}
        onCancel={handleCancel}

      >
        <div className="delete-modal">
          <div className='icon'><ExclamationCircleOutlined /></div>
          <div className='text'>Are you sure you want to delete it?</div>
        </div>

      </Modal>
    </div>
  );
}

export default DeleteModal;
