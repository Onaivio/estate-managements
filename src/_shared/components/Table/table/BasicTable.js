import React, { Fragment } from 'react';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { paginationOption } from '../options/paginationOption';

import { NoDataIndication } from './index';
import { BasicSearch } from '../search';
import { columnOption } from '../options';


export const BasicTable = props => {
    const {
        SearchComponent,
        keyField,
        hover,
        onTableChange,
        remote,
        striped,
        searchEnabled,
        data,
        paginationData,
        expandRow,
        selectRow,
        ColToggle,
        cellEdit,
        columnToggle = false,
        loading,
        ...rest
    } = props;

    const { ToggleList } = ColumnToggle;


    return (
        <Fragment>
            {paginationData && (
                <ToolkitProvider
                    {...rest}
                    keyField={keyField ? keyField : 'index'}
                    data={data}
                    columnToggle={columnToggle}
                    striped={striped}
                    hover={hover}
                >
                    {props => (
                        <div>
                            <PaginationProvider
                                pagination={paginationFactory(paginationOption(paginationData))}
                            >
                                {({ paginationProps, paginationTableProps }) => (
                                    <div
                                        style={{ backgroundColor: '#ffffff' }}
                                        className="card p3 pb-0 basic-table mb-3"
                                    >
                                        <div className="row mb-1">
                                            <div className="col-1">
                                                <span>
                                                    <SizePerPageDropdownStandalone
                                                        {...paginationProps}
                                                        hideSizePerPage={false}
                                                    />
                                                </span>
                                            </div>
                                            <div className="col-8">
                                                {columnToggle && (
                                                    <span>
                                                        <div>
                                                            Columns: {' '}
                                                            {ColumnToggle ? (
                                                                <ColToggle {...props.columnToggleProps}/>
                                                            ) : (
                                                                <ToggleList
                                                                    {...props.columnToggleProps}
                                                                    contextual="secondary"
                                                                />
                                                            )}
                                                        </div>
                                                    </span>
                                                )}
                                            </div>
                                            {searchEnabled && (
                                                <div className="col-3">
                                                    {SearchComponent ? (
                                                        <SearchComponent {...props.searchProps}/>
                                                    ) : (
                                                        <BasicSearch
                                                            {...props.searchProps}
                                                            placeHolder={'Search....'}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <BootstrapTable
                                            {...props.baseProps}
                                            noDataIndication={() => (
                                                <NoDataIndication data={data} loading={loading}/>
                                            )}
                                            remote={remote}
                                            striped={true}
                                            bordered={false}
                                            onTableChange={onTableChange}
                                            filter={filterFactory(columnOption({}))}
                                            expandRow={expandRow}
                                            selectRow={selectRow}
                                            cellEdit={cellEdit ? cellEdit : cellEditFactory({})}
                                            {...paginationTableProps}
                                        />
                                    </div>
                                )}
                            </PaginationProvider>
                        </div>
                    )}
                </ToolkitProvider>
            )}
        </Fragment>
    );
};


