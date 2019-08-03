import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import SubscriptionsList from '~/components/SubscriptionsList';
import { Container, Logo, List, Loading, Info } from './styles';

function Subscriptions({ navigation }) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadSubscriptions() {
        try {
            setLoading(true);
            const response = await api.get('subscriptions');

            setSubscriptions(response.data);
        } catch (err) {
            console.tron.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSubscriptions();
    }, []);

    useEffect(() => {
        navigation.addListener('didFocus', () => {
            loadSubscriptions();
        });
    }, [navigation]);

    async function handleCancelSubscription(id) {
        try {
            setLoading(true);
            await api.delete(`subscriptions/${id}`);
            Alert.alert('', 'Inscrição cancelada com sucesso !');
        } catch (err) {
            Alert.alert('', 'Erro !');
        } finally {
            loadSubscriptions();
            setLoading(false);
        }
    }

    console.tron.log(subscriptions);
    return (
        <Background>
            <Container>
                <Logo>M</Logo>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {!loading && !subscriptions.length && (
                            <Info>
                                Você ainda não se inscreveu em nenhum meetup.
                            </Info>
                        )}
                        <List
                            data={subscriptions}
                            keyExtractor={item => String(item.id)}
                            renderItem={({ item }) => (
                                <SubscriptionsList
                                    data={item}
                                    onCancelSubscription={() =>
                                        handleCancelSubscription(item.id)
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

Subscriptions.navigationOptions = {
    tabBarLabel: 'Inscrições',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="local-offer" size={20} color={tintColor} />
    ),
};

export default withNavigation(Subscriptions);
