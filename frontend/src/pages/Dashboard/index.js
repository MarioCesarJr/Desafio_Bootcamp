import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, isBefore, parse } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, List } from './styles';

export default function Dashboard() {
    const [meetups, setMeetups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMeetups() {
            try {
                const response = await api.get('organizing');

                const data = response.data.map(meetup => {
                    return {
                        ...meetup,
                        past: isBefore(parse(meetup.date), new Date()),
                        formattedDate: format(
                            meetup.date,
                            'DD [de] MMMM, [às] HH:mm[h]',
                            {
                                locale: pt,
                            }
                        ),
                    };
                });
                setMeetups(data);
            } catch (err) {
                toast.error('Erro ao carregar meetups. Tente mais tarde.');
            } finally {
                setLoading(false);
            }
        }

        loadMeetups();
    }, []);

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
                        <h1>Meus meetups</h1>
                        <Link to="/new">
                            <button type="button">
                                <MdAddCircleOutline size={17} />
                                Novo meetup
                            </button>
                        </Link>
                    </header>

                    {!loading && !meetups.length && (
                        <div className="empty">
                            Você não tem nenhum meetup cadastrado.
                        </div>
                    )}

                    <ul>
                        {meetups.map(meetup => (
                            <Link to={`/detail/${meetup.id}`}>
                                <List
                                    key={meetup.id}
                                    past={meetup.past ? 1 : 0}
                                >
                                    <strong>{meetup.title}</strong>
                                    <span>
                                        {meetup.formattedDate}
                                        <MdChevronRight
                                            size={30}
                                            color="#FFF"
                                        />
                                    </span>
                                </List>
                            </Link>
                        ))}
                    </ul>
                </>
            )}
            ;
        </Container>
    );
}
