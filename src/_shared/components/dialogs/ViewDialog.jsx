import React from 'react';
import { Modal } from 'antd';
import Loading from '../Partials/Loading';


const ViewDialog = props => {
    const {
        title,
        size,
        data,
        loading,
        showDialog,
        handleClose,
        ViewComponent,
    } = props;

    return (
        <div>
            <Modal
                title={title}
                size={size}
                visible={showDialog}
                onClose={handleClose}
                className="view"
            >
                {!data || loading ? (
                    <Loading/>
                ) : (
                    <div>
                        {!loading ? (
                            <ViewComponent data={data}/>
                        ) : (
                            <div className="text-center">No data found</div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ViewDialog;
