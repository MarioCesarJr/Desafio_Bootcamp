import React, { useMemo } from 'react';
import { format, isBefore, parse } from 'date-fns';
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

export default function Meetups({ data, onSubscription }) {
    const dateParsed = useMemo(() => {
        return format(data.date, 'DD [de] MMMM, [às] HH:mm[h]', {
            locale: pt,
        });
    }, [data.date]);

    return (
        <>
            <Image
                source={{
                    uri: `http://10.0.2.2:3333/files/${data.File.path}`,
                }}
            />

            <Container past={isBefore(parse(data.date), new Date())}>
                <Info>
                    <Title>{data.title}</Title>
                    <Div>
                        <Icon name="event" size={20} color="#999" />
                        <TextInfo>{dateParsed}</TextInfo>
                    </Div>
                    <Div>
                        <Icon name="location-on" size={20} color="#999" />
                        <TextInfo>{data.location}</TextInfo>
                    </Div>
                    <Div>
                        <Icon name="person" size={20} color="#999" />
                        <TextInfo>{data.User.name}</TextInfo>
                    </Div>
                </Info>

                {!isBefore(parse(data.date), new Date()) && (
                    <SubmitButton onPress={onSubscription}>
                        Realizar inscrição
                    </SubmitButton>
                )}
            </Container>
        </>
    );
}
