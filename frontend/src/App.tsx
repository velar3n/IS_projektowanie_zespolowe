import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import ThemeProvider from './contexts/ThemeProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <StyledHeader className="test">Hello there!</StyledHeader>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const StyledHeader = styled.h1`
  color: black;
`;
export default App;
