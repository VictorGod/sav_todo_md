import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardComponent from '../components/CardComponent';

describe('CardComponent', () => {
  const mockOnDelete = jest.fn();
  const mockOnStatusChange = jest.fn();
  const defaultProps = {
    title: 'Test Task',
    date: new Date('2023-01-01'),
    onDelete: mockOnDelete,
    status: 'Задано',
    onStatusChange: mockOnStatusChange,
  };

  it('renders correctly', () => {
    const { getByText } = render(<CardComponent {...defaultProps} />);
    expect(getByText('Test Task')).toBeTruthy();
    expect(getByText('Дата: Sun Jan 01 2023')).toBeTruthy();
    expect(getByText('Статус: Задано')).toBeTruthy();
  });

  it('calls onStatusChange when status button is pressed', () => {
    const { getByText } = render(<CardComponent {...defaultProps} />);
    const statusButton = getByText('Статус: Задано');
    fireEvent.press(statusButton);
    expect(mockOnStatusChange).toHaveBeenCalled();
  });

  it('calls onDelete when long press on card', () => {
    const { getByText } = render(<CardComponent {...defaultProps} />);
    const card = getByText('Test Task');
    fireEvent(card, 'onLongPress');
    expect(mockOnDelete).toHaveBeenCalled();
  });
});