import React, { Fragment, useEffect, useState } from 'react';
import { Button, Tooltip, Modal, Drawer, Tag } from 'antd';
import { history } from '../../../redux/store';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter, showConfirm } from '../../functions/util';
import { connect } from 'react-redux';
import { EyeOutlined, EditOutlined, PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './Resource.scss';
import Progress from '../Progress';
import AdvanceTable from '../Table/table/AdvanceTable';
import ResourceForm from './ResourceForm';


const propTypes = {
    isFetchingResource: PropTypes.bool,
    isAddingResource: PropTypes.bool,
    isUpdatingStatus: PropTypes.bool,
    resources: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
    isFetchingResource: true,
    isAddingResource: false,
    resources: [],
    className: {
        form: 'resource__form_component',
        view: 'resource__view_component',
        main: 'resource__main',
    },
};

const ResourceItem = props => {
    const [showView, setShowView] = useState(false);
    const {
        showNumbering = false,
        title,
        showBackButton = false,
        deletionMessage = 'Are you sure you want to perform this function',
        formFooter = null,

        // custom fields,
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
        updateModalSize = 720,
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
        showAction = true,

        // This will determine if the button click will be redirecting to another page
        isEditLink = false,
        isViewLink = false,

        // This will determine if action column and title should be visible
        noAction = false,
        noTitle = false,
        className,

        // This will determine if is to use a modal or a drawer
        // if true use drawer, else use modal
        isDrawerOrModal = true,

    } = props;

    const [showForm, setShowForm] = useState(false);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [value, setValue] = useState(null);
    const [formValues, setFormValues] = useState({ active: true, _id: '' });

    let data = resources.map((item, index) => ({ ...item, index: index + 1 }));

    useEffect(() => {
        setShowConfirmDialog(false);
    }, [resources]);

    const actionFormatter = (index, record) => {
        return (
            <div className={className && className.main ? className.main : 'resource_main'}>
                {showViewButton && (resourceView || isViewLink) && (
                    <Tooltip title="View">
                        <Button type="primary"
                                className="mr-2"
                                icon={<EyeOutlined/>}
                                size="small"
                                onClick={() => {
                                    view(record);
                                }}/>
                    </Tooltip>
                )}
                {/*{(update || isEditLink) && (showEditButton && !record.hideEdit && (*/}
                {showEditButton && !record.hideEdit && (
                    <Tooltip title="Edit">
                        <Button
                            type="secondary"
                            className="mr-2"
                            size="small"
                            icon={<EditOutlined/>}
                            onClick={() => {
                                edit(record);
                            }}
                        />
                    </Tooltip>
                )}
                {/*{remove && showDeleteButton && !record.hideDelete && (*/}
                {showDeleteButton && !record.hideDelete && (
                    <Tooltip title="Delete">
                        <Button
                            size="small"
                            danger
                            loading={isDeleting}
                            icon={<DeleteOutlined/>}
                            onClick={() => confirm(record)}
                        />
                    </Tooltip>
                )}
            </div>
        );
    };

    const view = (record) => {
        if (isViewLink) {
            history.push(`/${pathname}/${record._id}/view`);
        } else {
            setFormValues(record);
            setShowView(true);
        }
    };

    const edit = (record) => {
        if (isEditLink) {
            history.push(`/${pathname}/${record._id}/edit`);
        } else {
            setShowForm(true);
            setFormValues(record);
        }
    };

    const confirm = record => {
        setValue(record);
        setShowConfirmDialog(true);
        onShowConfirm(record);
    };

    const handleClose = () => {
        setValue(null);
        setFormValues({});
        setShowForm(false);
        setDialogIsOpen(false);
        setShowView(false);
    };

    const removeData = (value = {}) => {
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
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
        ];
    };

    const actionColumn = () => {
        if ((!showDeleteButton && !showEditButton) || noAction) {
            return [];
        }
        return [
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: actionFormatter,
            },
        ];
    };

    const numberColumn = (show) => {
        if (show) {
            return [
                {
                    title: '#',
                    dataIndex: 'index',
                    key: 'index',
                    onHeaderCell: (column) => {
                        return { width: '2%' };
                    },
                },
            ];
        }
        return [];
    };

    const onSearchChange = (pagination, filter, sorter) => {
        tableChange(pagination, filter, sorter);
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

    const onShowConfirm = (record) => {
        showConfirm(`Delete ${resourceName}`, deletionMessage, null, null, removeData(record), onHide());
    };

    const [activeLayout, setActiveLayout] = useState('list');

    return (
        <Fragment>
            <div className="card-header">
                <h3 className="card-title"
                    style={{ fontSize: 35 }}>
                    {`${capitalizeFirstLetter(resourceName)}s`}{' '}
                </h3>
            </div>
            {!noTitle && (
                <div className="mb-3 d-flex align-items-center">
                    {showBackButton && (
                        <Button
                            style={{ cursor: 'pointer' }}
                            icon={<ArrowLeftOutlined/>}
                            onClick={() => history.goBack()}
                        />
                    )}

                    <h1>
                        {((isFetching || isUpdatingStatus) && (
                            <Progress/>
                        ))}
                    </h1>
                    <div className="text-right flex-grow-1">
                        {viewMap && (
                            <div className="btn mr-2 layout-menu">
                                {/*<List*/}
                                {/*className={`${activeLayout === 'list' && 'active'}`}*/}
                                {/*onClick={() => setActiveLayout('list')}*/}
                                {/*/>*/}
                                {/* Show map here if necessary */}
                            </div>
                        )}
                    </div>
                    {add && (
                        <Tooltip title={`${title && title.add ? title.add : `Add new ${resourceName}`}`}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<PlusOutlined/>}
                                onClick={redirectAdding ? () => redirectAdding() : handleShow}
                            />
                        </Tooltip>
                    )}
                </div>
            )}
            {(activeLayout === 'list' && (
                <AdvanceTable
                    key={data.map((item) => item.index)}
                    searchEnabled={searchEnabled}
                    paginationData={pagination ? pagination : {}}
                    className="table-responsive"
                    onTableChange={onSearchChange}
                    loading={isFetching}
                    data={data}
                    columns={columns && columns.length > 0
                        ? numberColumn(showNumbering).concat([
                            ...columns,
                            // ...actionColumn(),
                        ])
                        : numberColumn(showNumbering).concat([
                            ...defaultColumns(),
                            // ...actionColumn(),
                        ])
                    }
                />
            ))}

            {isDrawerOrModal ? (
                <Drawer
                    title={
                        _.isEmpty(formValues)
                            ? title && title.add ? title.add : `Add ${resourceName}`
                            : !_.isEmpty(formValues) && title && title.update ? title.update : `Update ${resourceName}`
                    }
                    footer={formFooter}
                    className={className && className.form ? className.form : 'resource__form__component'}
                    visible={showForm && onShow}
                    onClose={handleClose}
                    width={updateModalSize}
                >
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
                </Drawer>
            ) : (
                <Modal
                    title={
                        _.isEmpty(formValues)
                            ? title && title.add ? title.add : `Add ${resourceName}`
                            : !_.isEmpty(formValues) && title && title.update ? title.update : `Update ${resourceName}`
                    }
                    visible={showForm && onShow}
                    width={updateModalSize}
                    centered
                    onCancel={handleClose}
                    footer={formFooter}
                >
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
                            formValues={formValues}
                        />
                    )}
                </Modal>
            )}
            {resourceView && isDrawerOrModal && (
                <Drawer
                    title={title && title.add ? title.add : `View ${resourceName}`}
                    footer={formFooter}
                    className={className && className.form ? className.form : 'resource__form__component'}
                    visible={showView}
                    onClose={handleClose}
                    width={updateModalSize}>
                    {formValues && formValues.active && (
                        <div className="status mb-3 bg">
                            Status: {' '}
                            <Tag className="text-capitalize"
                                 color={formValues.active === `Active` ? 'cyan' : 'red'}>
                                {formValues.active === 'Active' ? 'Active' : 'Not Active'}
                            </Tag>
                        </div>
                    )}
                    {resourceView(formValues)}
                </Drawer>
            )}
            {resourceView && !isDrawerOrModal && (
                <Modal
                    title={title && title.add ? title.add : `View ${resourceName}`}
                    footer={formFooter}
                    className={className && className.form ? className.form : 'resource__form__component'}
                    visible={showView}
                    onClose={handleClose}
                    centered>
                    {formValues && formValues.active && (
                        <div className="status mb-3 bg">
                            Status: {' '}
                            <Tag className="text-capitalize"
                                 color={formValues.active === `Active` ? 'cyan' : 'red'}>
                                {formValues.active === 'Active' ? 'Active' : 'Not Active'}
                            </Tag>
                        </div>
                    )}
                    {resourceView(formValues)}
                </Modal>
            )}
        </Fragment>
    );
};

ResourceItem.propTypes = propTypes;
ResourceItem.defaultProps = defaultProps;

const stateProps = ({ router }) => ({
    location: router.location,
});

export default connect(stateProps, null)(ResourceItem);
