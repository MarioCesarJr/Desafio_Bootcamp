import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, isBefore, parse } from 'date-fns';
import { Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt';
import {
    MdDeleteForever,
    MdModeEdit,
    MdEvent,
    MdLocationOn,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { confirmAlert } from 'react-confirm-alert';
import history from '~/services/history';
import api from '~/services/api';

import './react-confirm-alert.css';

import { Container } from './styles';

export default function Detail({ match }) {
    const { id } = match.params;

    const [meetup, setMeetup] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMeetup() {
            try {
                const response = await api.get(`organizing/${id}`);
                setMeetup({
                    ...response.data.meetup,
                    subscriptions: response.data.subscriptions,
                    file: response.data.meetup.File.url,
                    past: isBefore(parse(meetup.date), new Date()),
                    formattedDate: format(
                        meetup.date,
                        'DD [de] MMMM, [às] HH:mm[h]',
                        {
                            locale: pt,
                        }
                    ),
                });
            } catch (err) {
                toast.error('Erro ao carregar meetup. Tente mais tarde.');
            } finally {
                setLoading(false);
            }
        }
        loadMeetup();
    }, [id, meetup.date]);

    async function handleCancel(meetupId) {
        try {
            await api.delete(`/meetups/${meetupId}`);

            toast.success('Meetup cancelado');

            history.push('/dashboard');
        } catch (err) {
            toast.error('Erro. Tente novamente.');
        }
    }

    function confirmDialog() {
        confirmAlert({
            title: 'Confirmação',
            message: meetup.past
                ? 'Você realmente deseja exluir o Meetup ?'
                : 'Você realmente deseja cancelar o Meetup ?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => handleCancel(meetup.id),
                },
                {
                    label: 'Não',
                    onClick: () => '',
                },
            ],
        });
    }

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
                <>
                    <header>
                        <h1>{meetup.title}</h1>

                        <div className="button_container">
                            {!meetup.past && (
                                <Link to={`/edit/${meetup.id}`}>
                                    <button type="button" className="edit">
                                        <MdModeEdit size={17} />
                                        <div className="space" />
                                        Editar
                                    </button>
                                </Link>
                            )}

                            <div className="space" />
                            <button
                                type="button"
                                onClick={() => confirmDialog()}
                            >
                                <MdDeleteForever size={17} />
                                <div className="space" />
                                Cancelar
                            </button>
                        </div>
                    </header>

                    <img src={meetup.file} alt="" />

                    <div className="description">
                        <p>{meetup.description}</p>
                    </div>

                    <div className="footer">
                        <div className="date">
                            <MdEvent />
                            <div className="space" />
                            {meetup.formattedDate}
                        </div>
                        <div className="location">
                            <MdLocationOn />
                            <div className="space" />
                            {meetup.location}
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

Detail.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
