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
    this.handleChange = this.handleChange.bind(this);
    this.fetchAdress = this.fetchAdress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  render() {
    console.log(this.state)
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
              placeholder="J"
              onChange={this.handleChange}
              required
            />
            <Textfield
              type="text"
              name="tussenvoegsel"
              placeholder="de"
              onChange={this.handleChange}
            />
            <Textfield
              type="text"
              name="achternaam"
              placeholder="Vries"
              onChange={this.handleChange}
              required
            />
          </Entree>

          <h2>Adres</h2>
          <Entree>
            <Textfield
              type="text"
              name="postcode"
              placeholder="0000AA"
              pattern="[1-9][0-9]{3}[\s]?[A-Za-z]{2}"
              onInvalid={event => event.target.setCustomValidity('Please fill in a valid postcode')}
              onChange={this.handleChange}
              required
            />
          </Entree>

          <Entree>
            <Textfield
              type="text"
              name="straat"
              placeholder="Pepperonilaan"
              value={this.state.formData.straatnaam}
              onChange={this.handleChange}
              required
            />
            <Textfield
              type="text"
              name="huisnummer"
              placeholder="3"
              onChange={this.handleChange}
              required
            />
          </Entree>
          <Entree>
            <Textfield
              type="text"
              name="stad"
              placeholder="Bielefeld"
              value={this.state.formData.stad}
              onChange={this.handleChange}
              required
            />
          </Entree>

          <h2>Email</h2>
          <Entree>
            <Textfield
              type="email"
              name="email"
              placeholder="jan@voorbeeld.nl"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onInvalid={event => event.target.setCustomValidity('Please fill in a valid email')}
              onChange={this.handleChange}
              required
            />
          </Entree>

          <SubmitButton type="submit" value="Submit" onClick={this.onSubmit} />
        </form>
      </Wrapper>
    );
  }

  handleChange = (event) => {
    event.preventDefault();

    const name = event.target.name
    const value = event.target.value

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      }
    }))

    if (event.target.name === 'postcode') this.fetchAdress(value)
  }

  async fetchAdress(postcode) {
    if (RegExp(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i).test(postcode)) {
      const response = await fetch(`http://photon.komoot.de/api/?q=${postcode}&limit=1`)
        .then(response => response.json())
        .then(data => data = data.features[0].properties);

      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          straatnaam: response.name,
          stad: response.city,
        }
      }));
    }
  }

  onSubmit() {
    if (this.form.current.reportValidity()) console.log('submit: ', this.state);
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

  &:valid {
    border-bottom: 0.5px solid green;
  }
`;

const SubmitButton = styled.input`
  padding: 1em;
  border: 1px solid black;
  background-color: transparant;
  text-color: black;
  font-weight: 700;
  float: right;
`;