import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    min-height: 100vh;
    max-width: 600px;
    margin: 50px auto;

    display: flex;
    flex-direction: column;

    .loading {
        display: flex;
        justify-content: center;
        margin-top: 160px;
    }

    .empty {
        color: #fff;
        margin-top: 20px;
    }

    header {
        display: flex;
        justify-content: space-between;
        color: #fff;

        button {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 5px 0 0;
            height: 35px;
            width: 130px;
            align-self: flex-end;
            background: #f94d6a;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 14px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, '#f94d6a')};
            }
        }

        strong {
            color: #fff;
            font-size: 24px;
            margin: 0 15px;
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 15px;
        margin-top: 30px;
    }
`;

export const List = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-radius: 4px;
    opacity: ${props => (props.past ? 0.45 : 0.8)};
    background: rgba(0, 0, 0, 0.1);

    strong {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 15px;
        font-weight: normal;
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 3px;
        color: #666;
    }

    .pagination {
        display: flex;
        align-content: space-between;
    }
`;
