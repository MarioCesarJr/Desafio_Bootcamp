import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    min-height: 100vh;
    max-width: 600px;
    margin: 50px auto;

    .loading {
        display: flex;
        justify-content: center;
        margin-top: 160px;
    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        textarea {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            padding: 15px 15px;
            color: #fff;
            margin: 0 0 10px;
            resize: none;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        span {
            color: #fb6f91;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        .buttonForm {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 5px 0 0;
            height: 35px;
            width: 160px;
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
    }
`;
