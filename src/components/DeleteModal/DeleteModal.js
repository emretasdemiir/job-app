import './DeleteModal.css';

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';



function DeleteModal({ data, deleteModalVisible, setDeleteModalVisible, cellKeyForEdit, setData }) {

  const foundDataForEditModalIndex = data.findIndex(element => element.key === cellKeyForEdit)

  const handleDelete = (e) => {
    const newData = [...data]

    newData.splice(foundDataForEditModalIndex, 1)
    newData.sort((a, b) => a.prioritykey - b.prioritykey)

    setData(newData)
    setDeleteModalVisible(false)

  }

  const handleCancel = (e) => {
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
        onOk={(e) => handleDelete(e)}
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
