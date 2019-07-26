import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import { parse } from 'date-fns';
import api from '~/services/api';
import history from '~/services/history';

import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

export default function NewEdit({ match }) {
    const { id } = match.params;

    const [meetup, setMeetup] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadMeetup() {
            try {
                setLoading(true);
                const response = await api.get(`organizing/${id}`);
                setMeetup({
                    ...response.data.meetup,
                    date: parse(response.data.meetup.date),
                    file_id: {
                        url: response.data.meetup.File.url,
                        id: response.data.meetup.File.id,
                    },
                });
            } catch (err) {
                toast.error('Erro ao carregar meetup. Tente mais tarde.');
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            loadMeetup();
        }
    }, [id]);

    async function handleSubmit(data) {
        try {
            setLoading(true);
            if (id) {
                await api.put(`/meetups/${id}`, data);
                toast.success('Meetup atualizado com successo');
                history.push(`../detail/${id}`);
            }
        } catch (err) {
            toast.error('Erro ao criar meetup, verifique seus dados');
        } finally {
            setLoading(false);
        }
    }

    console.tron.log(meetup);

    const schema = Yup.object().shape({
        file_id: Yup.number().required('Banner é obrigatório'),
        title: Yup.string().required('Título é obrigatório'),
        description: Yup.string().required('Descrição é obrigatório'),
        date: Yup.date().required('Data é obrigatório'),
        location: Yup.string().required('Local é obrigatório'),
    });

    return (
        <Container>
            {loading ? (
                <div className="loading">
                    <Loader
                        type="TailSpin"
                        color="#f94d6a"
                        width={62}
                        height={62}
                    />
                </div>
            ) : (
                <Form
                    initialData={meetup}
                    schema={schema}
                    onSubmit={handleSubmit}
                >
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
                        Atualizar meetup
                    </button>
                </Form>
            )}
        </Container>
    );
}

NewEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
    }).isRequired,
};
