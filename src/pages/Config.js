import React from 'react';
import Header from '../components/Header';

class Config extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <span data-testid="settings-title">Configurações</span>
      </div>
    );
  }
}

export default Config;
