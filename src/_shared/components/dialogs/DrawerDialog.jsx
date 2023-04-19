import React from 'react';
import { Drawer } from 'antd';


const DrawerDialog = props => {

    const {
        title = 'Form Title',
        size,
        showDialog,
        handleClose,
        formProps,
        FormComponents,
        bodyStyle,
        footer = null,
        placement = 'right',
        className = '',
    } = props;

    return (
        <div>
            <Drawer
                title={title}
                width={size}
                placement={placement}
                visible={showDialog}
                className={className}
                bodyStyle={bodyStyle}
                onClose={handleClose}
                footer={footer}
            >
                <FormComponents {...formProps}/>
            </Drawer>
        </div>
    );
};

export default DrawerDialog;
