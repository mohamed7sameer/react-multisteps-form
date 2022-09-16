// import logo from './logo.svg';
import './App.css';
import { Button, Card, CardContent, TextField } from '@mui/material';
import { Formik , Form , Field , ErrorMessage} from 'formik';

import * as Yup from 'yup';
import React, { useState }  from 'react';


function App() {
  return (
    <div className="App">
      <Card>
        <CardContent>
          
        <Formik
       initialValues={{ name: "", age: 18, description: "" }}
       validationSchema = {
        Yup.object().shape({
          name: Yup.string().required('name is required'),
          age: Yup.number().required('age is required').min(18,'only +18'),
          description: Yup.string().min(10),
        })
       }

       

       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        validateField,
      }) => (

         <Form>
          <FormSteps 
          isSubmitting={isSubmitting}
          validateField={validateField}
          errors={errors}
          touched={touched}
          >
           <Field
            type="text"
            name="name"
            id="name"

            onChange={handleChange}
            onBlur={handleBlur}
            
            placeholder="name"
            component={TextField}
            value={values.name}
            error={errors.name?true:false} 
            helperText={errors.name && errors.name}
            />
           {/* <ErrorMessage name="name" component="div" /> */}
           <Field
            type="number"
            name="age"
            id="age"

            onChange={handleChange}
            onBlur={handleBlur}

            placeholder="age"
            component={TextField}
            value={values.age}
            error={errors.age?true:false} 
            helperText={errors.age && errors.age}
            />
           {/* <ErrorMessage name="age" component="div" /> */}


           <Field
            type="text"
            name="description"
            id="description"

            onChange={handleChange}
            onBlur={handleBlur}

            placeholder="description"
            component={TextField}
            value={values.description}
            error={errors.description?true:false} 
            helperText={errors.description && errors.description}
            />
           {/* <ErrorMessage name="description" component="div" /> */}
           
           </FormSteps>
         </Form>
       )}
       </Formik>

        </CardContent>
      </Card>
    </div>
  );

}

const FormSteps = (props) => {
  const childrenArr = React.Children.toArray(props.children);
  const [step,setStep] = useState(0);
  
  const name = childrenArr[step].props.name;
  const isError = props.errors[name]?true:false
  const isTuched = props.touched[name]?true:false
  const isEmpty = !childrenArr[step].props.value ?
      true: false
  const goNext = (e)=>{
    console.log(childrenArr[step].props.value.length)
    if((isTuched && !isError) || (!isEmpty && !isError)){
        setStep(step + 1)
    }else{
      props.validateField(name)
    }
  
    // console.log(props.errors.name)
    // console.log(x)
    // if(!){
    //   setStep(step + 1)
    // }
    
    
  }
  const goBack = (e)=>{
    setStep(step - 1)
  }
  return <>
  {/* {props.children} */}
  {childrenArr[step]}



  {step > 0 && (
 <Button
 onClick={goBack}
 disabled={props.isSubmitting}
 variant="contained"
 color="secondary"
>
 Back
</Button>
  )}
  

  { step < childrenArr.length - 1 && (
    <Button
    onClick={goNext}
    disabled={props.isSubmitting}
    variant="contained"
    color="secondary"
  >
    Next
  </Button>
  ) }

{step === childrenArr.length-1 && (
  <Button
    type="submit"
    disabled={props.isSubmitting}
    variant="contained"
    color="primary"
  >
    Submit
  </Button>
)}
  </>
} 

export default App;
