import React from 'react';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';


const ConfirmDialog = props => {
    const {
        loading,
        confirmButtonText = 'Yes',
        cancelButtonText = 'No',
        message,
        showDialog,
        handleConfirm,
        handleClose,
        onHide,
    } = props;

    return (
        <div>
            <Modal show={showDialog} onHide={onHide} animation={false}>
                <Modal.Header>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message ? message : 'Are you sure you want to perform this function'}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="secondary" variant="primary" onClick={handleClose}>
                        {cancelButtonText}
                    </Button>
                    <Button color="primary" variant="secondary" onClick={handleConfirm}>
                        {loading ? <i className="fa fa-spinner"/> : confirmButtonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default ConfirmDialog;
