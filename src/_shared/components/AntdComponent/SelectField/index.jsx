import React from 'react';
import { Select, Form, Tag } from 'antd';

export default ({
                    name,
                    className,
                    options,
                    defaultValue,
                    value,
                    labelInValue,
                    placeHolder,
                    isLoading,
                    mode = 'default',
                    disable,
                    onChangeValue,
                    onSearch,
                    onSelect,
                    isTagEnabled = false,
                    onDeselect,
                    label,
                    disabled,
                    showSearch,
                    allowClear = true,
                    ...rest
                }) => {


    const tagRender = props => {
        const { label, value, closable, onClose } = props;
        return (
            <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
                {label}
            </Tag>
        );
    };

    return (
        <>
            <div>
                <Form.Item
                    name={name}
                    label={label}
                    rules={rest.rule ? rest.rule : null}
                    hasFeedback
                >
                    <Select
                        allowClear={allowClear}
                        placeholder={placeHolder}
                        options={options}
                        tagRender={isTagEnabled ? tagRender : null}
                        value={value}
                        defaultValue={defaultValue}
                        loading={isLoading}
                        showSearch={showSearch || false}
                        mode={mode}
                        labelInValue={labelInValue || false}
                        onChange={onChangeValue || null}
                        onSearch={onSearch || null}
                        onSelect={onSelect || null}
                        onDeselect={onDeselect || null}
                        disabled={disabled}
                        {...rest}
                    />
                </Form.Item>

            </div>
        </>
    );

}
