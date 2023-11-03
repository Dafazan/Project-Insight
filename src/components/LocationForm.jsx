import React from 'react';
import { Formik, Form, Field } from 'formik';

const LocationForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ latitude: '', longitude: '' }}
            onSubmit={onSubmit}
        >
            <Form>
                <div>
                    <label htmlFor="latitude">Latitude:</label>
                    <Field type="number" name="latitude" />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude:</label>
                    <Field type="number" name="longitude" />
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default LocationForm;
