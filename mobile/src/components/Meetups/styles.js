import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
    margin-bottom: 15px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #fff;
    padding: 15px;
    display: flex;
    flex-direction: column;

    opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Image = styled.Image`
    width: 100%;
    height: 150px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

export const Info = styled.View`
    margin-left: 15px;
`;

export const Title = styled.Text`
    margin-top: 20px;
    font-weight: bold;
    font-size: 14px;
    color: #333;
`;

export const Div = styled.View`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const TextInfo = styled.Text`
    color: #999;
    font-size: 13px;
    margin-left: 5px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 20px;
`;
