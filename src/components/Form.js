import styled from "styled-components"

const Form = styled.form`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 32px 0;
    gap: 14px;
    font-family: Montserrat;

    input {
        height: 45px;
        padding-left: 15px;
        width: 95%;
        border-radius: 15px;
        border: #FFFFFF;
        box-shadow: rgba(99, 99, 99, 0.2) 2px 2px 8px 2px;;
        font-size: 16px;
    }

    .disabled-button{
        background-color: #263a55;
        color: #7a7474;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button{
        background-color: #C8CCE7;
        color: #FFFFFF;
        font-size: 18px;
        height: 40px;
        width: 80%;
        border-radius: 15px;
        border: none;
    }

    .post-text{
        height: 270px;
        align-items: flex-start !important;
    }
`

export default Form