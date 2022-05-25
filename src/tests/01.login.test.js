import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe('Testes para a tela de login', () => {
  test('Testa se os inputs de nome e email estão renderizando', () => {
    renderWithRouterAndRedux(<App />);
    const inputs = screen.getAllByRole('textbox');

    expect(inputs[0]).toBeDefined();
    expect(inputs[1]).toBeDefined();
  });

  test('Testa se os inputs aceitam valores de nome e email', () =>{
    renderWithRouterAndRedux(<App />);
    const inputs = screen.getAllByRole('textbox');

    userEvent.type(inputs[0], 'exemplo@email.com');
    expect(inputs[0]).toHaveValue('exemplo@email.com');
    userEvent.type(inputs[1], 'Jogador Um');
    expect(inputs[1]).toHaveValue('Jogador Um');
  });
  test('testa se o botão "Play" aparece na tela', () => {
    renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', { name: 'Play'});
    expect(btnPlay).toBeDefined();
  });
  test('Testa se o botão "Play" está desabilitado se os inputs estiverem vazios', () => {
    renderWithRouterAndRedux(<App />);
    const inputs = screen.getAllByRole('textbox');
    const btnPlay = screen.getByRole('button', { name: 'Play'});
    expect(inputs[0]).toHaveValue('');
    expect(inputs[1]).toHaveValue('');
    expect(btnPlay).toBeDisabled();
  });
  test('Testa se o botão "Play" está desabilitado se o input "nome" estiver vazio', () => {
    renderWithRouterAndRedux(<App />);
    const inputs = screen.getAllByRole('textbox');
    const btnPlay = screen.getByRole('button', { name: 'Play'});
    expect(btnPlay).toBeDefined();
    userEvent.type(inputs[0], 'exemplo@email.com');
    expect(inputs[0]).toHaveValue('exemplo@email.com');
    expect(inputs[1]).toHaveValue('');
    expect(btnPlay).toBeDisabled();
  });
  test('Testa se o botão "Play" está desabilitado se o input "email" estiver vazio', () => {
    renderWithRouterAndRedux(<App />);
    const inputs = screen.getAllByRole('textbox');
    const btnPlay = screen.getByRole('button', { name: 'Play'});
    expect(btnPlay).toBeDefined();
    expect(inputs[0]).toHaveValue('');
    userEvent.type(inputs[1], 'Jogador Um');
    expect(inputs[1]).toHaveValue('Jogador Um');
    expect(btnPlay).toBeDisabled();
  });
  test('Testa se o botão "Play" está habilitado ao inserir nome e email', () => {
    renderWithRouterAndRedux(<App />);
    const inputs = screen.getAllByRole('textbox');
    const btnPlay = screen.getByRole('button', { name: 'Play'});
    userEvent.type(inputs[0], 'exemplo@email.com');
    expect(inputs[0]).toHaveValue('exemplo@email.com');
    userEvent.type(inputs[1], 'Jogador Um');
    expect(inputs[1]).toHaveValue('Jogador Um');
    expect(btnPlay).not.toBeDisabled();
  });
  test('testa se o botão "Configurações" aparece na tela', () => {
    renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', { name: 'Configurações'});
    expect(btnPlay).toBeDefined();
  });
  test('Testa se ao apertar no botão "Play" é redirecionado para "/play"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputs = screen.getAllByRole('textbox');
    const btnPlay = screen.getByRole('button', { name: 'Play'});
    userEvent.type(inputs[0], 'exemplo@email.com');
    expect(inputs[0]).toHaveValue('exemplo@email.com');
    userEvent.type(inputs[1], 'Jogador Um');
    expect(inputs[1]).toHaveValue('Jogador Um');
    expect(btnPlay).not.toBeDisabled();
    userEvent.click(btnPlay);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Testa se ao clicar em "Configurações" é redirecionado para "/configuracoes"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnConfiguracao = screen.getByRole('button', { name: 'Configurações' })
    userEvent.click(btnConfiguracao);
    const { pathname } = history.location;
    expect(pathname).toBe('/configuracoes');
  })
});
