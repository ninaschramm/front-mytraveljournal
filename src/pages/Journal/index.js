import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/Card';
import PostCard from '../../components/PostCard';
import useGetTravelById from '../../hooks/useGetTravelById';
import { toast } from 'react-toastify';
import useGetPosts from '../../hooks/useGetPosts';
import AddButton from '../../components/AddButton';
import useAddPost from '../../hooks/useAddPost';
import useRemovePost from '../../hooks/useRemovePost';
import Form from '../../components/Form';
import { FaTrash, FaBackward } from 'react-icons/fa';

export default function Journal() {

	const { getPosts } = useGetPosts();
    const { getTravelById } = useGetTravelById();
    const { addPost } = useAddPost();
    const { removePost } = useRemovePost();
	const { tripId } = useParams();
    const [postsList, setPostList] = useState(null);
    const [travelInfo, setTravelInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          const posts = await getPosts(tripId);    
          setPostList(posts);
          const travel = await getTravelById(tripId);    
		setTravelInfo(travel);
        }
        try {      
        fetchData();
        }
        catch(err) {
          toast("Ops, something went wrong")
        }
      }, [refresh]);

    const handleOpenModal = () => {
    setShowModal(true);
    };

    const handleCloseModal = () => {
    setShowModal(false);
    setImage('');
    setText('');
    };      

    async function handleSubmit(e){
    e.preventDefault();
        
        const data = {
          image,
          text
        }

        try {
          await addPost(tripId, data);
          toast("Post added")
        }
        catch(err) {
          toast(err.message)
        }
        setRefresh(!refresh)
        handleCloseModal();
      };

    async function deletePost(target){
        const postId = target.id;        

        try {
            await removePost(tripId, postId)
            setRefresh(!refresh);
          }
          catch(err) {
            toast(err.message)
          }
    }

    const goBack = () => {
		navigate(-1);
	}

	return (        
		<Card>  
              { showModal ?      
                <>
                <h1>New post:</h1>
                <Form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='post-text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Text" />
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="image url" />
                    <button type="submit">Submit</button>
                    <button onClick={handleCloseModal}>Close</button>
                </Form></>
          :          
                travelInfo && 
                <>
                    <h1>My Travel Journal</h1>  
                    <h2>{travelInfo.title}</h2>		
                    <Container>
                        {postsList && postsList.map((post, index) => 
                            <PostCard key={index} id={post.id}>
                                <div className='icon'>
                                    <FaTrash id={post.id} onClick={(e) => deletePost(e.currentTarget)}/>
                                </div>
                                <img src={post.image} alt="" />
                                <p>{post.text}</p>
                            </PostCard>
                        )}
                    </Container>
                    <AddButton onClick={handleOpenModal}>New Post</AddButton>
                    <div onClick={goBack}>
                    < FaBackward /> Voltar
                    </div>
                </>			
                }
		</Card>    
	);
}

const Container = styled.div`
  width: 320px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 330px;

  div {
  font-size: 16px !important;
  }
`;