import React, { useMemo } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Container,
    Div,
    Image,
    Info,
    TextInfo,
    Title,
    SubmitButton,
} from './styles';

export default function SubscriptionsList({ data, onCancelSubscription }) {
    const dateParsed = useMemo(() => {
        return format(data.Meetup.date, 'DD [de] MMMM, [às] HH:mm[h]', {
            locale: pt,
        });
    }, [data.Meetup.date]);

    return (
        <>
            <Image
                source={{
                    uri: `http://10.0.2.2:3333/files/${data.Meetup.File.path}`,
                }}
            />

            <Container>
                <Info>
                    <Title>{data.Meetup.title}</Title>
                    <Div>
                        <Icon name="event" size={20} color="#999" />
                        <TextInfo>{dateParsed}</TextInfo>
                    </Div>
                    <Div>
                        <Icon name="location-on" size={20} color="#999" />
                        <TextInfo>{data.Meetup.location}</TextInfo>
                    </Div>
                    <Div>
                        <Icon name="person" size={20} color="#999" />
                        <TextInfo>{data.Meetup.User.name}</TextInfo>
                    </Div>
                </Info>

                <SubmitButton onPress={onCancelSubscription}>
                    Cancelar inscrição
                </SubmitButton>
            </Container>
        </>
    );
}
