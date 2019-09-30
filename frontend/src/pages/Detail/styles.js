import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 600px;
    margin: 20px auto;

    display: flex;
    flex-direction: column;

    .loading {
        display: flex;
        justify-content: center;
        margin-top: 160px;
    }

    header {
        display: flex;
        justify-content: space-between;
        color: #fff;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px 0 0;
            height: 35px;
            width: 100px;
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

        button.edit {
            background: #3b9eff;

            &:hover {
                background: ${darken(0.03, '#3b9eff')};
            }
        }
    }

    .button_container {
        display: flex;
    }

    img {
        height: 170px;
        width: 100%;
        border-radius: 4px;
        margin: 30px auto;
        background-size: cover;
        object-fit: cover;
    }

    .description {
        max-height: 200px;
    }

    p {
        color: #fff;
        font-size: 15px;
        text-align: justify;
    }

    .footer {
        display: flex;
        margin-top: 20px;
    }

    .date {
        display: flex;
        align-items: center;
        color: #666;
    }

    .location {
        margin-left: 20px;
        display: flex;
        align-items: center;
        color: #666;
    }

    .space {
        width: 5px;
    }
`;
