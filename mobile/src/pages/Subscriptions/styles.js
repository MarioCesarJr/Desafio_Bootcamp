import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Logo = styled.Text`
    font-size: 40px;
    color: #f64c75;
    font-weight: normal;
    align-self: center;
    margin-top: 15px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    color: '#f94d6a',
    size: 'large',
})`
    flex: 1;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 },
})``;

export const Info = styled.Text`
    font-size: 16px;
    color: #fff;
    margin: 20px 20px;
`;
