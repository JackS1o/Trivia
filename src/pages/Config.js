import React from 'react';
import Header from '../components/Header';
import style from './Config.module.css';

class Config extends React.Component {
  render() {
    return (
      <div className="main_div">
        <div className={ style.config_div }>
          <Header />
          <span data-testid="settings-title">Configurações</span>
        </div>
      </div>
    );
  }
}

export default Config;
