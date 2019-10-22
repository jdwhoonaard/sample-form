import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        voorletters: undefined,
        tussenvoegsel: undefined,
        achternaam: undefined,
        postcode: undefined,
        straatnaam: undefined,
        stad: undefined,
        huisnummer: undefined,
        email: undefined,
      },
    }
  }

  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <h1> Incetro Form</h1>
        <form>

        </form>
      </Wrapper>
    );
  }

}

export default App;

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: 'IBM Plex Sans', sans-serif;
}

h1 {
  font-size: 3em;
  font-weight: 700;
}

h2 {
  font-size: 1em;
  font-weight: 700;
}

p {
  font-size: 1em;
  font-weight: 400;
}
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1em;
  max-width: 640px;
`;