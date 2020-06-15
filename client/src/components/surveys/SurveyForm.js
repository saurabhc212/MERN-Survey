import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import fromFields from './formFields';


class SurveyForm extends Component {

    renderFields(){
        return _.map(fromFields, field =>{
            return  <Field key={field.name} label={field.label} type='text' name={field.name} component={SurveyField} />
        })
    
    }
    render(){
        return(
            <div>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to='/surveys' className='red btn-flat white-text'>
                    Cancel
                </Link>
               <button type='submit' className='teal btn-flat right white-text'>
                   Next
                   <i className='material-icons right'>done</i>
                </button>
            </form>
            </div>
        );
    }

};

function validate(values){
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    _.each(fromFields, ({ name }) => {
        if(!values[name]) {
          errors[name] = 'You must provide a value'
        }
    })
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);