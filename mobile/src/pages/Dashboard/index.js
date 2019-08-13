import React, { useEffect, useState, useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import Background from '~/components/Background';
import Meetups from '~/components/Meetups';
import {
    Container,
    Logo,
    List,
    Loading,
    Header,
    DateText,
    Info,
} from './styles';

export default function Dashboard() {
    const [meetups, setMeetups] = useState([]);
    const [date, setDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const dateFormatted = useMemo(
        () => format(date, 'DD [de] MMMM', { locale: pt }),
        [date]
    );

    function handlePrevDay() {
        setDate(subDays(date, 1));
        setPage(1);
    }

    function handleNextDay() {
        setDate(addDays(date, 1));
        setPage(1);
    }

    useEffect(() => {
        async function loadMeetups() {
            try {
                const response = await api.get('meetups', {
                    params: { date, page },
                });

                setMeetups(response.data);
            } catch (err) {
                console.tron.log(err);
                Alert.alert('Erro', 'Por favor, tente mais tarde.');
            } finally {
                setRefresh(false);
                setLoading(false);
            }
        }

        loadMeetups();
    }, [date, page]);

    function loadMore() {
        if (meetups.length > 10) {
            setPage(page + 1);
            setLoading(true);
        }
    }

    function handleRefresh() {
        setPage(page - 1);
        setRefresh(true);
    }

    async function handleSubscription(id) {
        try {
            setLoading(true);
            await api.post(`meetups/${id}/subscriptions`);

            Alert.alert('', 'Incrição realizada com sucesso !');
        } catch (err) {
            Alert.alert('', 'Você já se inscreveu neste meetup !');
        } finally {
            setLoading(false);
        }
    }

    console.tron.log(meetups);
    return (
        <Background>
            <Container>
                <Logo>M</Logo>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Header>
                            <TouchableOpacity onPress={handlePrevDay}>
                                <Icon
                                    name="chevron-left"
                                    size={30}
                                    color="#FFF"
                                />
                            </TouchableOpacity>
                            <DateText>{dateFormatted}</DateText>
                            <TouchableOpacity onPress={handleNextDay}>
                                <Icon
                                    name="chevron-right"
                                    size={30}
                                    color="#FFF"
                                />
                            </TouchableOpacity>
                        </Header>

                        {!loading && !meetups.length && (
                            <Info>
                                Não existe nenhum meetup nesta data ou horário.
                            </Info>
                        )}
                        <List
                            data={meetups}
                            keyExtractor={item => String(item.id)}
                            onEndReached={loadMore}
                            onEndReachedThreshold={0.01}
                            onRefresh={handleRefresh}
                            refreshing={refresh}
                            renderItem={({ item }) => (
                                <Meetups
                                    data={item}
                                    onSubscription={() =>
                                        handleSubscription(item.id)
                                    }
                                />
                            )}
                        />
                    </>
                )}
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Meetups',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="format-list-bulleted" size={20} color={tintColor} />
    ),
};
