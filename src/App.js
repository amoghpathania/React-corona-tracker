import React from 'react';
import styles from './App.module.css';

import { fetchData } from './api';
import { Cards , Chart , CountryPicker } from './components';
import image from './images/image.png';
import ButtonAppBar from './components/NavigationBar/NavigationBar';

class App extends React.Component {
  state = {
    data: {},
    country:'',
  }

  async componentDidMount(){
    const fetchedData = await fetchData();

    this.setState({ data:fetchedData });
    
  }

  handleCountryChange = async (country) =>{
    const fetchedData = await fetchData(country);
    
    this.setState({ data : fetchedData , country :country });
  }
  render(){
    const { data, country } = this.state;
    return (
    <div>
      <ButtonAppBar />
      <div className={styles.container} >
      <img className={styles.image} src={image} alt="COVID-19" />
      < Cards data={data} />
      < CountryPicker handleCountryChange={this.handleCountryChange} />
      < Chart data={data} country={country} />
      </div>
    </div>
  );
}
}

export default App;
