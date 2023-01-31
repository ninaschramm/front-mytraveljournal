import styled from "styled-components";


const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 270px;
  height: fit-content;
  padding: 6px;
  border: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 2px 2px 8px 2px;
  border-radius: 10px;
  background-color: #FFF;
  margin-right: 20px;
  margin-bottom: 10px;
  position: relative;

  img{
    max-width: 255px;
    height: auto;
    min-height: 30px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  h3{
    font-size: 12px;
    font-weight: 700;
    color: #3C3C3C;
    margin-top: 10px;
  }

  p{
    font-size: 12px;
    font-weight: 400;
    color: #3C3C3C;
    margin-top: 5px;
  }

  .icon {
    position: absolute;
    top: 10px;
    right: 0px;
    width: 50px;
    height: 24px;
    padding: 3px;
    background: rgba(150, 230, 215, 0.6);
    color: #4c566a;
  }
`;

export default PostCard;