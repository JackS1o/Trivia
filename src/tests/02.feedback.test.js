import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
describe('Testes para a tela de feedback', () => {
  test('Testa se existe uma mensagem de feedback', () => {
    renderWithRouterAndRedux(<Feedback />);
    const message = screen.getByTestId("feedback-text");
    expect(message).toBeInTheDocument();
  });
  test('Testa se a mensagem de feedback é "Well Done!" ou "Could be better..."', () => {
    renderWithRouterAndRedux(<Feedback />);
    const message = screen.getByTestId("feedback-text");
    const score = screen.getByTestId("feedback-total-score");
    if ( score > 3) {
      expect(message).toBe("Well Done!")
    } else {
      expect(message).toBeInTheDocument(/Could be better.../)
    }
  });
  test('Testa se existe um valor de score', () => {
    renderWithRouterAndRedux(<Feedback />);
    const score = screen.getByTestId("feedback-total-score");
    expect(score).toBeInTheDocument();
  });
  test('Testa se existe um botão com a opção de jogar novamente', () => {
    renderWithRouterAndRedux(<Feedback />);
    const playAgainButton = screen.getByRole('button', { name: 'Play Again'});
    expect(playAgainButton).toBeInTheDocument();
  });
  test('Testa se existe um botão com a opção para redirecionar para a página de ranking', () => {
    renderWithRouterAndRedux(<Feedback />);
    const rankingButton = screen.getByRole('button', { name: 'Ranking'});
    expect(rankingButton).toBeInTheDocument();
  });
  test('Testa se um botão para voltar para tela inicial aparece na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const homeButton = screen.getByRole('button', { name: 'Home'});
    expect(homeButton).toBeInTheDocument();
  });
  test('Testa o nome do jogador aparece na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const playerName = screen.getByTestId("header-player-name");
    expect(playerName).toBeInTheDocument;
  });
  test('Testa a imagem do gravatar aparece na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const playerGravatar = screen.getByRole('img');
    expect(playerGravatar).toBeInTheDocument();
  });
  test('Testa a imagem do gravatar vem da API', () => {
    renderWithRouterAndRedux(<Feedback />);
    const playerGravatar = screen.getByRole('img');
    expect(playerGravatar).toHaveAttribute('src', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e')
  });
  test('Testa se existe um valor de score total', () => {
    renderWithRouterAndRedux(<Feedback />);
    const scoreTotal = screen.getByTestId("header-score");
    expect(scoreTotal).toBeInTheDocument();
  });
  test('Testa se ao clicar em "Ranking" é redirecionado para "/"', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const rankingButton = screen.getByRole('button', { name: 'Ranking'});
    userEvent.click(rankingButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })
  test('Testa se ao clicar em "Play Again" é redirecionado para "/"', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const playAgainButton = screen.getByRole('button', { name: 'Play Again'});
    userEvent.click(playAgainButton);
    const { pathname } = history.location;
    expect(pathname).toBe("/");
  })
});