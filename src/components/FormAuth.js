import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import AuthService from "../services/AuthService";
import React from 'react';
import '../styles/globalStyles.css'
import {useDispatch} from "react-redux";
import {loginUser, setAuth} from "../actions/actions";

const FormAuth = () => {
    // const dispatch = useDispatch()
    const {login} = AuthService()
    const dispatch = useDispatch()

    const handleSubmit = async (email, password) => {
        try {
            const response = await login(email, password)
            localStorage.setItem('token', `${response.data.accessToken}`)
            dispatch(loginUser(response.data.user))
            dispatch(setAuth(true))
            console.log(response.data.accessToken)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

    return (

        <Formik
            initialValues={
                {
                    password: '',
                    email: ''
                }
            }

            validationSchema={Yup.object({
                password: Yup.string()
                    .min(6, 'Длина пароля должна быть больше 6 символов!')
                    .required('Обязательное поле!'),
                email: Yup.string()
                    .email('Некорректная эл. почта!')
                    .required('Обязательное поле!'),
            })}

            onSubmit={
                values => console.log(JSON.stringify(values))
            }>
            {({
                  values,
                  isValid,
                  dirty,
                  isSubmitting,
                  resetForm
              }) => (
                  <>
                <Form>
                    <div>

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div style={{display: 'grid'}}>
                            <label className={'input'}>Эл. почта</label>
                            <Field
                                name={"email"}
                                className="custom-input"
                                id={"email"}
                                placeholder="&nbsp;"
                            />

                            <ErrorMessage className={'errorMessage'} name={'email'} component={'div'}/>
                        </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div style={{display: 'grid'}}>
                            <label className={'input'} >Пароль</label>
                            <Field
                                name={"password"}
                                className="custom-input"
                                id={"password"}
                                type={'password'}
                                placeholder="&nbsp;"
                            />

                            <ErrorMessage className={'errorMessage'} name={'password'} component={'div'}/>
                        </div>
                        </div>

                    </div>
                    <div className="center">
                    <button type={'submit'} disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                        isSubmitting = true
                        await handleSubmit(values.email, values.password)
                        setTimeout(() => resetForm(), 500)
                    }} className="register-button">Войти</button>
                    </div>
                </Form>
                  </>
            )}
        </Formik>
    )
}

export default FormAuth;
