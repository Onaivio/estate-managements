import React, { Fragment } from 'react';
import { Table, Pagination } from 'antd';
import { BasicSearch } from '../search';
import { paginationOption } from '../options';

export const AdvanceTable = props => {

    const {
        SearchComponent,
        onTableChange,
        searchEnabled,
        data,
        paginationData,
        loading,
        showHeader = true,
        tableLayout = 'auto',
        columns,
        ...rest
    } = props;
    const paginationOpt = {
        ...paginationOption(paginationData),
    };
    return (
        <Fragment>
            <div>
                {searchEnabled && (
                    <div className="col-3">
                        {SearchComponent
                            ? (<SearchComponent {...props.searchProps}/>)
                            : <BasicSearch {...props.searchProps} placeHolder={'Search...'}/>}
                    </div>
                )}
                <Table
                    key={data.map((item) => item.index)}
                    bordered={false}
                    dataSource={data}
                    columns={columns}
                    onChange={onTableChange}
                    loading={loading}
                    showHeader={showHeader}
                    tableLayout={tableLayout}
                    pagination={paginationOpt}
                    {...rest}
                />
            </div>
        </Fragment>
    );
};

export default AdvanceTable;
