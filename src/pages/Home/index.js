import styled from 'styled-components';

export default function Home() {
	return (
		<Page>
            My Travel Journal
		</Page>
	);
}

const Page = styled.div`
	min-height: 100vh;
	width: 100%;
    display: flex;
    justify-content: center;
`;