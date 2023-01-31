import styled from "styled-components";


const CardBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    background-color: ${props => props.id ? '#CADDE0': '#EED8DD'};
    border-color: #fff;
    border-radius: 15px;
    font-family: Montserrat;
    font-size: 25px;
    color: #fff;
    width: 320px;
    height: 75px;
    cursor: pointer;

    @media (max-width: 600px) {
        width: 300px;
    }
`;

export default CardBox;