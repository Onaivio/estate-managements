import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { history } from '../../../redux/store';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import ResourceForm from './ResourceForm';
import Progress from '../Progress/index';
import { capitalizeFirstLetter } from '../../functions/util';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import { connect } from 'react-redux';
import { BasicTable } from '../Table/index';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { cellEditOption } from '../Table/options/index';

import { ReactComponent as List } from './list.svg';

import './Resource.scss';

const propTypes = {
    isFetchingResource: PropTypes.bool,
    isAddingResource: PropTypes.bool,
    isUpdatingStatus: PropTypes.bool,
    resources: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
    isFetchingResource: false,
    isAddingResource: false,
    resources: [],
    className: {
        form: 'resource__form__component',
        view: 'resource__view_component',
        main: 'resource__main',
    },
};

const Resource = props => {
    const [showView, setShowView] = useState(false);
    const {
        showNumbering = false,
        title,
        showBackButton = false,
        deletionMessage = 'Are you sure you want to perform this function',

        // custom fields
        pagination,
        tableChange,

        // The dispatch function to perform a basic crud
        add,
        remove,
        update,

        // the redux-form for add and edit
        resourceForm: CustomForm,

        // the dispatch function to load a create component
        redirectAdding,

        // The view component
        resourceView,
        resourceViewModalSize = 'lg',
        updateModalSize = 'md',
        viewMap,

        // Action listeners
        isDeleting,
        isFetching,
        isUpdating,
        isUpdatingStatus,

        // the resources array data
        resources = [],

        // the name of the resource
        resourceName,

        searchEnabled = false,

        // Table columns
        columns,
        location: { pathname },

        // Determine which of the crud button should be visible by default
        showEditButton = true,
        showDeleteButton = true,
        showViewButton = true,

        // This will determine if the button click will be redirecting to another page
        isEditLink = false,
        isViewLink = false,

        // This will determine if action column and title should be visible
        noAction = false,
        noTitle = false,
        className,
    } = props;

    const [showForm, setShowForm] = useState(false);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [value, setValue] = useState(null);
    const [formValues, setFormValues] = useState({ active: true, _id: '' });

    let data = resources.map((item, index) => ({ ...item, index: index + 1 }));

    console.log('resource-data:', data);

    useEffect(() => {
        setShowConfirmDialog(false);
    }, [resources]);

    const actionFormatter = (cell, row) => {
        console.log('row:', row);
        console.log('columns:', columns.length);
        return (
            <div className={className && className.main ? className.main : 'resource_main'}>
                {showViewButton && (resourceView || isViewLink) && (
                    <Button
                        size="xs"
                        color="info"
                        className="mr-1 text-white"
                        onClick={() => view(row)}
                    >
                        <i className="fa fa-eye"/> View
                    </Button>
                )}
                {(update || isEditLink) && (showEditButton && !row.hideEdit && (
                    <Button
                        size="xs"
                        color="secondary"
                        className="mr-1"
                        onClick={() => edit(row)}
                    >
                        <i className="fa fa-edit"/> Edit
                    </Button>
                ))}
                {remove && showDeleteButton && !row.hideDelete && (
                    <Button
                        size="xs"
                        color="danger"
                        onClick={() => confirm(row)}
                    >
                        <i className="fa fa-trash"/> Delete
                    </Button>
                )}
            </div>
        );
    };

    const view = (row) => {
        if (isViewLink) {
            history.push(`/${pathname}/${row._id}/view`);
        } else {
            setFormValues(row);
            setShowView(true);
        }
    };

    const edit = (row) => {
        console.log('row:', row);
        if (isEditLink) {
            history.push(`/${pathname}/${row._id}/edit`);
        } else {
            setShowForm(true);
            setFormValues(row);
        }
    };

    const confirm = row => {
        setValue(row);
        setShowConfirmDialog(true);
    };

    const handleClose = () => {
        setValue(null);
        setFormValues({});
        setShowForm(false);
        setDialogIsOpen(false);
        setShowView(false);
    };

    const removeData = () => {
        remove(value);
    };

    const handleShow = () => {
        setShowForm(true);
        setFormValues({});
    };

    const onHide = () => {
        setShowConfirmDialog(false);
        setValue(null);
    };

    const handleSubmit = (data) => {
        if (_.isEmpty(formValues)) {
            add({ ...data });
        } else {
            update({ ...data, _id: formValues._id });
        }
    };

    const defaultColumns = () => {
        return [
            {
                dataField: 'name',
                text: 'Name',
            },
        ];
    };

    const actionColumn = () => {
        if ((!showDeleteButton && !showEditButton) || noAction) {
            return [];
        }
        return [
            {
                dataField: 'actions',
                text: 'Action',
                editable: false,
                formatter: actionFormatter,
            },
        ];
    };

    const numberColumn = (show) => {
        if (show)
            return [
                {
                    dataField: 'index',
                    editable: false,
                    text: '#',
                    headerStyle: (column, colIndex) => {
                        return { width: '2%' };
                    },
                },
            ];
        return [];
    };

    const onSearchChange = (type, value) => {
        tableChange({ type, ...value });
    };

    const updateDone = update => {
        if (!update && dialogIsOpen) {
            setShowForm(false);
            setDialogIsOpen(false);
        }
    };

    const onShow = () => {
        setDialogIsOpen(true);
        return true;
    };

    const [activeLayout, setActiveLayout] = useState('list');

    return (
        <Fragment>
            <div className="card-header">
                <h3 className="card-title"
                    style={{ fontSize: 35 }}>
                    {`${capitalizeFirstLetter(resourceName)}s`}{' '}</h3>
            </div>
            {!noTitle && (
                <div className="mb-3 d-flex align-items-center">
                    {showBackButton && (
                        <i
                            className="back-icon fa-lg fa fa-arrow-left mr-4"
                            style={{ cursor: 'pointer' }}
                            onClick={() => history.goBack()}
                        />
                    )}
                    <h1>
                        {((isFetching || isUpdatingStatus) && (
                            <Progress className="alt ml-2 d-inline"/>
                        ))}
                    </h1>
                    <div className="text-right flex-grow-1">
                        {viewMap && (
                            <div className="btn mr-2 layout-menu">
                                <List
                                    className={`${activeLayout === 'list' && 'active'}`}
                                    onClick={() => setActiveLayout('list')}
                                />
                                {/* Show map here if necessary */}
                            </div>
                        )}
                        {add && (
                            <Button
                                color="primary"
                                className="btn mr-2"
                                onClick={redirectAdding ? () => redirectAdding() : handleShow}
                            >
                                <i className="fa fa-plus"/> {' '}
                                {title && title.add ? title.add : `Add New ${resourceName}`}
                            </Button>
                        )}
                    </div>
                </div>
            )}
            {(activeLayout === 'list' && (
                <BasicTable
                    searchEnabled={searchEnabled}
                    paginationData={pagination}
                    className="table-responsive"
                    onTableChange={onSearchChange}
                    data={data}
                    remote
                    search={{ searchFormatted: true }}
                    searchProps={{ delay: 2000 }}
                    cellEdit={cellEditFactory(cellEditOption({}))}
                    columns={
                        columns && columns.length > 0
                            ? numberColumn(showNumbering).concat([
                                ...columns,
                                ...actionColumn(),
                            ])
                            : numberColumn(showNumbering).concat([
                                ...defaultColumns(),
                                ...actionColumn(),
                            ])
                    }
                />
            ))}
            <Modal
                key="updateModel"
                onShow={onShow}
                show={showForm}
                onHide={handleClose}
                centered
                autoFocus
                size={updateModalSize}
                backdrop="static"
                className={className && className.form ? className.form : 'resource__form__component'}
            >
                <Modal.Header closeButton>
                    {_.isEmpty(formValues) && (
                        <Modal.Title>{title && title.add ? title.add : `Add ${resourceName}`}</Modal.Title>
                    )}
                    {!_.isEmpty(formValues) && (
                        <Modal.Title>{title && title.update ? title.update : `Update ${resourceName}`}</Modal.Title>
                    )}
                </Modal.Header>
                <Modal.Body>
                    {!CustomForm ? (
                        <ResourceForm
                            updateDone={updateDone}
                            onCancel={handleClose}
                            onSubmit={handleSubmit}
                            updating={!_.isEmpty(formValues)}
                            formLoading={isUpdating}
                            initialValues={{ ...formValues }}
                        />
                    ) : (
                        <CustomForm
                            updateDone={updateDone}
                            onCancel={handleClose}
                            onSubmit={handleSubmit}
                            updating={!_.isEmpty(formValues)}
                            formLoading={isUpdating}
                            initialValues={{ ...formValues }}
                        />
                    )}
                </Modal.Body>
            </Modal>
            {resourceView && (
                <Modal
                    key="viewModal"
                    show={showView}
                    onHide={handleClose}
                    size={resourceViewModalSize}
                    autoFocus
                    className={
                        className && className.view ? 'view ' + className.view : 'view resource__view__component'
                    }
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {title && title.view ? title.view : `View ${resourceName}`}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formValues && formValues.active && (
                            <div className="status mb-3 bg">
                                Status: {' '}
                                {formValues.active || formValues.status === 'Active' ? (
                                    <span className="badge badge-pill badge-success">Active</span>
                                ) : (
                                    <span className="badge badge-pill badge-danger">Not Active</span>
                                )}
                            </div>
                        )}
                        {resourceView(formValues)}
                    </Modal.Body>
                </Modal>
            )}
            <ConfirmDialog
                value={value}
                showDialog={showConfirmDialog}
                loading={isDeleting}
                handleConfirm={removeData}
                handleClose={onHide}
                message={deletionMessage}
            />
        </Fragment>
    );
};

Resource.protoTypes = propTypes;
Resource.defaultProps = defaultProps;

const stateProps = state => ({
    location: state.router.location,
});

export default connect(stateProps, null)(Resource);
