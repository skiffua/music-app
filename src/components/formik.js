import {ErrorMessage, useField} from "formik";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import {FormCheck} from "react-bootstrap";
import React from "react";

const ErrorBlock = ({ name }) => (
    <ErrorMessage name={ name } className='errorBlock text-warning' component='div' />
);

export const FormTextInput = ({ label, ...props }) => {
    const [ field ] = useField(props);
    const { controlId, name } = props;
    return (
        <>
            <FormGroup controlId={ controlId }>
                <FormLabel >{ label }</FormLabel>
                <FormControl { ...field } { ...props} />
                <ErrorBlock name={ name } />
            </FormGroup>
        </>
    );
};

export const RadioInput = ({ children, ...props }) => {
    const [field] = useField({ ...props, type: 'radio'});
    return (
        <>
            <FormCheck
                { ...field }
                { ...props }
                type = "radio"
                label = { children }
            />
        </>
    );
};
