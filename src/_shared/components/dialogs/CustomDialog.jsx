import React from 'react';
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    showDialog: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    body: PropTypes.any.isRequired,
};

const defaultProps = {
    showDialog: false,
    body: null,
};

const CustomDialog = props => {
    const {
        loading,
        title,
        confirmButtonText = 'Yes',
        cancelButtonText = 'No',
        showDialog,
        handleConfirm,
        handleClose,
        onHide,
        size,
        body: DialogComponent,
        footer: DialogFooter,
    } = props;

    return (
        <div>
            <Modal
                show={showDialog}
                onHide={onHide}
                autoFocus={true}
                size={size}
                animation={true}
            >
                {title && (
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                )}
                <Modal.Body>
                    <DialogComponent/>
                </Modal.Body>
                {DialogFooter && (
                    <DialogFooter/>
                )}
                {/*(*/}
                    {/*<Modal.Footer>*/}
                        {/*<Button color="secondary" variant="primary" onClick={handleClose}>*/}
                            {/*{cancelButtonText}*/}
                        {/*</Button>*/}
                        {/*<Button color="primary" variant="secondary" onClick={handleConfirm}>*/}
                            {/*{loading ? <i className="fa fa-spinner"/> : confirmButtonText}*/}
                        {/*</Button>*/}
                    {/*</Modal.Footer>*/}
                {/*)}*/}

            </Modal>
        </div>
    );
};

CustomDialog.propTypes = propTypes;
CustomDialog.defaultProps = defaultProps;

export default CustomDialog;
