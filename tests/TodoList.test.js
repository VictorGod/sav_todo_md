// tests/TodoList.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TodoList from '../components/TodoList'; 

test('добавление новой задачи', async () => {
  const { getByPlaceholderText, getByText } = render(<TodoList />);

  const input = getByPlaceholderText('Введите вашу задачу');
  fireEvent.changeText(input, 'Новая задача');

  const addButton = getByText('Добавить задачу');
  fireEvent.press(addButton);

  await waitFor(() => {
    expect(getByText('Новая задача')).toBeTruthy();
  });
});
