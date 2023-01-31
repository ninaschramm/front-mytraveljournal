import styled from "styled-components";

const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 62px 0;
margin-top: 50px;
background-color: #fff;
border-color: #fff;
border-radius: 15px;
color: rgba(0,0,0,.87);
width: 390px;
height: 620px;

h1 {
  font-family: Lobster;
  font-size: 30px;
  font-weight: bold;
  color: #ffa8a8;
  text-shadow: 1px 1px 2px rgba(230, 73, 128, 0.3);
}

h2 {
  font-size: 26px;
  font-weight: bold;
  color: #CADDE0;
}

a {
  font-size: 14px;
}

@media (max-width: 600px) {
  width: 320px;
}
`;

export default Card;