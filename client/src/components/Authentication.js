import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useFormik} from "formik"
import * as yup from "yup"

function Authentication({updateUser}) {
    const [signUp, setSignUp] = useState(false)
    const history = useHistory()
    
    const handleClick = () => setSignUp((signUp) => !signUp)

    const formSchema = yup.object().shape({
        name: yup.string().required(),
        password: yup.string().email()
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
        <h2>{Object.values(formik.errors)}</h2>
        <h2>enter the site or register!</h2>
        <h2>{signUp?'Already a member?':'Not yet a member?'}</h2>
        <button onClick={handleClick}>{signUp?'Log in':'Register'}</button>
        <Form onSubmit={formik.handleSubmit}>
            <label>
            Username
            </label>
        <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
        {signUp&&(
            <>
            <label>
                Email
            </label>
            <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
            </>
        )}
        <input type='submit' value={signUp?'Sign Up': 'Log In'} />
        </Form>
        </>

    )
}

export default Authentication