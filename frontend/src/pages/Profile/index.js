import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { Container } from './styles';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('email é obrigatório'),
        oldPassword: Yup.string().when('password', (password, field) =>
            password ? field.required('Senha atual é obrigatória') : field
        ),
        password: Yup.string()
            .transform(value => (!value ? null : value))
            .nullable()
            .min(6, 'Senha deve ter no mínimo 6 caracteres'),
        confirmPassword: Yup.string().when('password', (password, field) =>
            password
                ? field
                      .required()
                      .oneOf([Yup.ref('password')], 'Senha não corresponde')
                : field
        ),
    });

    return (
        <Container>
            <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome completo" />
                <Input
                    name="email"
                    type="email"
                    placeholder="Seu endereço de e-mail"
                />

                <hr />

                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua senha atual"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmação de senha"
                />

                <button type="submit">
                    <MdAddCircleOutline size={17} />
                    Salvar perfil
                </button>
            </Form>
        </Container>
    );
}
