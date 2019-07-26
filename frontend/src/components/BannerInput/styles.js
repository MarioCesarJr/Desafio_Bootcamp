import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 4px;
    margin-bottom: 15px;
    background: #191620;

    label {
        display: flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }

        img {
            height: 170px;
            width: 100%;
            border-radius: 4px;
            background-size: cover;
            object-fit: cover;
        }

        strong {
            color: rgba(255, 255, 255, 0.3);
        }

        input {
            display: none;
        }
    }
`;

export const Message = styled.span`
    margin-bottom: 5px;
`;
