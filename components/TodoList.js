import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardComponent from './CardComponent';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTodoDate, setNewTodoDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setTodos([
          { id: '1', text: 'Купить продукты', date: new Date('2023-01-01'), status: 'Задано' },
          { id: '2', text: 'Пробежать', date: new Date('2023-01-02'), status: 'В процессе' },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          date: newTodoDate,
          status: 'Задано',
        },
      ]);
      setNewTodo('');
    } else {
      alert('Пожалуйста, введите корректные данные.');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStatusChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newStatus = todo.status === 'Задано' ? 'В процессе' : 'Выполнено';
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || newTodoDate;
    setNewTodoDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Список дел</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите вашу задачу"
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
      />
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          value={newTodoDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Выберите дату"
          value={newTodoDate.toISOString().split('T')[0]}
          onChangeText={(text) => setNewTodoDate(new Date(text))}
        />
      )}
      <Button title="Добавить задачу" onPress={addTodo} />
      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <View style={styles.cardContainer}>
          {todos.map((todo) => (
            <CardComponent
              key={todo.id}
              title={todo.text}
              date={todo.date}
              onDelete={() => removeTodo(todo.id)}
              status={todo.status}
              onStatusChange={() => handleStatusChange(todo.id)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default TodoList;
