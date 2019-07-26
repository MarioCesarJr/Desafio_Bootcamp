import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    background: #191620;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
        display: flex;
        align-items: center;

        h1 {
            margin-right: 20px;
            padding-right: 20px;
            color: #f94d6a;
            font-size: 35px;
            font-weight: normal;
        }
    }

    aside {
        display: flex;
        align-items: center;
    }
`;

export const Profile = styled.div`
    display: flex;
    margin-left: 20px;
    padding-left: 20px;

    div {
        text-align: right;
        margin-right: 20px;

        strong {
            display: block;
            color: #fff;
        }

        a {
            display: block;
            margin-top: 2px;
            font-size: 12px;
            color: #999;
        }
    }

    button {
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 12px;
        transition: background 0.2s;
        width: 50px;
        height: 32px;
        background-color: #f94d6a;

        &:hover {
            background: ${darken(0.03, '#f94d6a')};
        }
    }
`;
