import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CardComponent = ({ title, date, onDelete, status, onStatusChange }) => {
  const handleStatusChange = () => {
    onStatusChange();
    if (status === 'Выполнено') {
      onDelete();
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardTouchable}
      onPress={handleStatusChange}
      onLongPress={onDelete}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{`Дата: ${date.toDateString()}`}</Text>
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === 'Задано' && styles.statusButtonDefault,
            status === 'В процессе' && styles.statusButtonInProgress,
            status === 'Выполнено' && styles.statusButtonCompleted,
          ]}
          onPress={handleStatusChange}
        >
          <Text>{`Статус: ${status}`}</Text>
        </TouchableOpacity>
        {status !== 'Выполнено' && (
          <TouchableOpacity
            style={[styles.statusButton, styles.statusButtonDefault]}
            onPress={onDelete}
          >
            <Text>Удалить</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardTouchable: {
    borderRadius: 8,
    overflow: 'hidden',
    margin: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginVertical: 8,
    alignItems: 'center',
  },
  statusButtonDefault: {
    backgroundColor: 'lightgray',
  },
  statusButtonInProgress: {
    backgroundColor: 'orange',
  },
  statusButtonCompleted: {
    backgroundColor: 'green',
  },
});

export default CardComponent;