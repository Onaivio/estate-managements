import React from 'react';
import { Modal } from 'antd';


const FormDialog = props => {
    const {
        title,
        size,
        showDialog,
        handleClose,
        formProps,
        centered = true,
        FormComponents,
    } = props;

    return (
        <div>
            <Modal
                title={title}
                width={size}
                visible={showDialog}
                onCancel={handleClose}
                centered={centered}
                footer={null}
            >
                <FormComponents {...formProps}/>
            </Modal>
        </div>
    );
};
export default FormDialog;
