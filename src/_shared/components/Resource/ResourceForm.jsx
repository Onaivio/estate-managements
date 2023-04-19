import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextInputField } from '../ReduxFormFields/index';
import { Button, Col, FormGroup, Label, Row } from 'reactstrap';
import Progress from '../Progress/index';


const required = value => (value ? undefined : 'This field is required');

const ResourceForm = props => {

    const {
        updateDone,
        formLoading,
        updating = false,
        handleSubmit,
        onCancel,
        borderFade = false,
    } = props;

    const bordered = `${borderFade ? 'border-fade' : ''}`;

    useEffect(() => {
        updateDone(formLoading);
    }, [formLoading]);

    return (
        <form onSubmit={handleSubmit}>
            <Row className={bordered}>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Field
                            validate={[required]}
                            type="text"
                            component={TextInputField}
                            name="name"
                        >
                        </Field>
                    </FormGroup>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}
                     className="d-flex justify-content-end"
                >
                    {!formLoading && (
                        <Button onClick={onCancel} className="px-5 mr-1" color="secondary">
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" className="px-5" color="primary">
                        {formLoading ? <Progress/> : `${updating ? 'Update' : 'Add'}`}
                    </Button>
                </Col>
            </Row>
        </form>
    );
};

export default reduxForm({
    // a unique name for the form
    form: 'resourceForm',
})(ResourceForm);
