import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
import {useFormik} from 'formik'
import * as yup from 'yup'

function Authentication({updateUser}) {
    const [signUp, setSignUp] = useState(false)
    const history = useHistory()
    
    const handleClick = () => setSignUp((signUp) => !signUp)

    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a username"),
        password: yup.string().required("Please enter a password")
    })

    const formik = useFormik({
        initialValues:{
            name:'',
            password:''
        },
        validationSchema: formSchema,
        onSubmit:(values) => {
            fetch(signUp?'/users':'/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(values)
            })
            .then(r => r.json())
            .then(user => {
                updateUser(user)
                history.push('/')
            })
        }


    }) 


    
    return (
        <>
        {Object.values(formik.errors).map(error => <h2>{error}</h2>)}
        <h2>enter the site or register!</h2>
        <h2>{signUp?'Already a member?':'Not yet a member?'}</h2>
        <button onClick={handleClick}>{signUp?'Log in':'Register'}</button>
        <form onSubmit={formik.handleSubmit}>
            <label>Username</label>
        <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
        {signUp&&(
            <>
            <label>Password</label>
            <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
            </>
        )}
        <input type='submit' value={signUp?'Sign Up': 'Log In'} />
        </form>
        </>

    )
}

export default Authentication