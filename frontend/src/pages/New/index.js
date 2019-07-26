import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

export default function New() {
    async function handleSubmit(data) {
        try {
            await api.post('meetups', data);
            toast.success('Meetup criado com sucesso!');
            history.push('dashboard');
        } catch (err) {
            toast.error('Erro ao criar meetup, verifique seus dados');
        }
    }

    const schema = Yup.object().shape({
        file_id: Yup.number().required('Banner é obrigatório'),
        title: Yup.string().required('Título é obrigatório'),
        description: Yup.string().required('Descrição é obrigatório'),
        date: Yup.date().required('Data é obrigatório'),
        location: Yup.string().required('Local é obrigatório'),
    });

    return (
        <Container>
            <Form schema={schema} onSubmit={handleSubmit}>
                <BannerInput name="file_id" />

                <Input name="title" placeholder="Título do Meetup" />
                <Input
                    multiline
                    name="description"
                    placeholder="Descrição completa"
                    rows="6"
                />
                <DatePicker name="date" placeholder="Data do meetup" />
                <Input name="location" placeholder="Localização" />

                <button className="buttonForm" type="submit">
                    <MdAddCircleOutline size={17} />
                    Salvar meetup
                </button>
            </Form>
        </Container>
    );
}

New.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
};
