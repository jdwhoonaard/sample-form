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

    this.form = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);

  }

  render() {
    const postcodeRegex = new RegExp(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i);
    return (
      <Wrapper>
        <GlobalStyle />
        <h1> Incetro Form</h1>
        <form ref={this.form} onSubmit={e => e.preventDefault()}>

          <h2>Naam</h2>
          <Entree>
            <Textfield
              type="text"
              name="voorletters"
              placeholder="J."
              required
            />
            <Textfield
              type="text"
              name="tussenvoegsel"
              placeholder="de"
            />
            <Textfield
              type="text"
              name="achternaam"
              placeholder="Vries"
              required
            />
          </Entree>

          <h2>Adres</h2>
          <Entree>
            <Textfield
              name="postcode"
              placeholder="0000AA"
              pattern={{ matchRegexp: postcodeRegex }}
              required
            />
          </Entree>

          <Entree>
            <Textfield
              type="text"
              name="straat"
              placeholder="Pepperonilaan"
              required
            />
            <Textfield
              type="text"
              name="huisnummer"
              placeholder="3"
              required
            />
          </Entree>
          <Entree>
            <Textfield
              type="text"
              name="stad"
              placeholder="Bielefeld"
              required
            />
          </Entree>

          <h2>Email</h2>
          <Entree>
            <Textfield
              type="email"
              name="email"
              placeholder="jan@voorbeeld.nl"
              required
            />
          </Entree>

          <SubmitButton type="submit" value="Submit" onClick={this.onSubmit} />
        </form>
      </Wrapper>
    );
  }

  onSubmit() {
    this.form.current.reportValidity();
    console.log(this.state);
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
  padding-top: 1.5em;
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

const Entree = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.25em 0;
`;

const Textfield = styled.input`
  width: 100%;
  padding: 1em;
  margin: 0.25em 0.25em;
  background-color: transparent;
  border: 0px solid;
  box-sizing: border-box;
  border-bottom: 0.5px solid black;
`;

const SubmitButton = styled.input`
  padding: 1em;
  border: 1px solid black;
  background-color: transparant;
  text-color: black;
  font-weight: 700;
  float: right;
`;