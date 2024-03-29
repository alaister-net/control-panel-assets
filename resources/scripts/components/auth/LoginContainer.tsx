import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import login from '@/api/auth/login';
import LoginFormContainer from '@/components/auth/LoginFormContainer';
import { Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import Field from '@/components/elements/Field';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import Reaptcha from 'reaptcha';
import useFlash from '@/plugins/useFlash';

interface Values {
    username: string;
    password: string;
}

const LoginContainer = ({ history }: RouteComponentProps) => {
    const ref = useRef<Reaptcha>(null);
    const [ token, setToken ] = useState('');

    const { clearFlashes, clearAndAddHttpError } = useFlash();

    useEffect(() => {
        clearFlashes();

        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        jqueryScript.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
        jqueryScript.crossOrigin = 'anonymous';
        document.body.appendChild(jqueryScript);

        const loginScript = document.createElement('script');
        loginScript.src = '/js/login.js';
        loginScript.defer = true;
        document.body.appendChild(loginScript);
      
        return () => {
            document.body.removeChild(loginScript);
            document.body.removeChild(jqueryScript);
        }
    }, []);

    const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes();

        login({ ...values, recaptchaData: token })
            .then(response => {
                if (response.complete) {
                    // @ts-ignore
                    window.location = response.intended || '/';
                    return;
                }

                history.replace('/auth/login/checkpoint', { token: response.confirmationToken });
            })
            .catch(error => {
                console.error(error);

                setToken('');
                if (ref.current) ref.current.reset();

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={{
                username: new URLSearchParams(document.location.search).get('username') || '',
                password: new URLSearchParams(document.location.search).get('password') || ''
            }}
            validationSchema={object().shape({
                username: string().required('A username or email must be provided.'),
                password: string().required('Please enter your account password.'),
            })}
        >
            {({ isSubmitting }) => (
                <LoginFormContainer title={'Alaister.net Control Panel'} css={tw`w-full flex`}>
                    <Field
                        light
                        type={'text'}
                        name={'username'}
                        disabled={true}
                        hidden={true}
                    />
                    <div css={tw`mt-6`}>
                        <Field
                            light
                            type={'password'}
                            name={'password'}
                            disabled={true}
                            hidden={true}
                        />
                    </div>
                    <div css={tw`mt-6`}>
                        <Button type={'submit'} size={'xlarge'} isLoading={true} disabled={isSubmitting} id={'pterodactyl_login'} />
                    </div>
                </LoginFormContainer>
            )}
        </Formik>
    );
};

export default LoginContainer;
