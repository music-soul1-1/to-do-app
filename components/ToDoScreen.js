//#region +---imports---+
import React, { useEffect } from 'react';
import { View, useColorScheme, FlatList, Keyboard, Alert } from 'react-native';
import { styles } from '../App.styles.js';
import { StatusBar } from 'expo-status-bar';
import { Button, TextInput, IconButton, FAB, Dialog, Portal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
//#endregion

export default function ToDo ({navigation}) {
  const [tasks, setTasks] = React.useState([]);
  const [textInputValue, setTextValue] = React.useState('');
  const [visibleDialog, setDialogVisible] = React.useState(false);
  const [visibleInput, setInputVisible] = React.useState(false);

  const showInput = () => setInputVisible(true);
  const hideInput = () => setInputVisible(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const colorScheme = useColorScheme();

  //#region +--Functions--+

  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        setTasks(savedTasks != null ? JSON.parse(savedTasks) : []);
      }
      catch(error) {
        Alert.alert('Error', 'There was an error loading tasks');
      }
    };
    loadTasks();

    // adding a button to header bar:
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={showDialog}
          mode='contained-tonal'
          title="Press Me"
        >Remove all tasks</Button>
      ),
    });
  
  }, []);

  // updating tasks in storage
  useEffect(() => {
    try {
      AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    }
    catch (error) {
      Alert.alert('Error', 'There was an error saving tasks');
    };
  }, [tasks]);

  const addTask = async () => {
    // if taskName is not empty:
    if (textInputValue && textInputValue.trim() !== "") {
      const newTask = { id: Math.random(), name: textInputValue, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks); // updating tasks array
      setTextValue('');
      hideInput();
    }
  };

  const deleteTask = async (taskIndex) => {
    setTasks(tasks.filter((task, index) => index !== taskIndex));
  };

  const removeAllTasks = async () => {
    setTasks([]);
    hideDialog();
  };

  const updateTaskText = async (taskIndex, newTaskText) => {
    setTasks(tasks.map((task, index) => {
      if (index === taskIndex) {
        return Object.assign({}, task, {name: newTaskText});
      }
      return task;
    })
    );
  };

  const updateTaskState = async (taskIndex, completed) => {
    const updatedTask = {...tasks[taskIndex], completed};
    const updatedTasks = [...tasks];
    
    updatedTasks[taskIndex] = updatedTask;
    setTasks(updatedTasks);
  };
  
  //#endregion

  return (
    <View style={styles.container}>
        {/* Dialog */}
        <Portal>
          <Dialog visible={visibleDialog} onDismiss={hideDialog}>
            <Dialog.Title>Do you really want to remove all your tasks?</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={removeAllTasks}>Yes</Button>
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={hideDialog}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      {/* Bottom input  */}
      <View style={styles.addTaskContainer}>

        {/* visible when FAB is pressed */}
        { visibleInput ? 
        <TextInput 
              autoFocus={true}
              style={styles.textInput}
              value={textInputValue}
              onChangeText={text => setTextValue(text)}
              label='enter your task here'
              underlineColorAndroid={'transparent'}
        /> : null }
        <FAB 
          style={styles.fab}
          icon="plus"
          size='medium'
          onPress={() => {
            showInput();
            addTask();
            Keyboard.dismiss(); // hides keyboard and removes focus
          }}
        />
      </View>

      {/* Tasks */}
      <FlatList
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={({item, index}) => (
          <View 
            key={item.id} 
            style={[styles.tasksContainer, 
            colorScheme == 'dark' ? styles.tasksContainer.dark : styles.tasksContainer.light ]} 
          >
            <TextInput onEndEditing={(event) => {
              updateTaskText(index, event.nativeEvent.text);
            }}
              defaultValue={item.name}
              multiline={true}
              mode='flat'
              underlineColor="transparent"
              outlineColor="transparent"
              contentStyle={[
                {width: 240},
                item.completed ? 
                (colorScheme == 'dark' ? styles.comletedTask.dark : styles.comletedTask.light) : 
                (colorScheme == 'dark' ? styles.textFieldDark : styles.textFieldLight)
              ]}
              style={[
                styles.taskTextInput, 
                colorScheme == 'dark' ? styles.taskTextInput.dark : styles.taskTextInput.light
              ]}
              underlineColorAndroid="transparent"
              spellCheck={false} // IOS only
            />
            <IconButton
              style={colorScheme == 'dark' ? styles.button.dark : styles.button.light}
              icon={item.completed ? "checkbox-marked" : "checkbox-blank-outline"}
              mode='contained'
              title={item.completed ? 'Completed' : 'Incomplete'}
              onPress={() => updateTaskState(index, !item.completed)}
            />
            <IconButton
              style={colorScheme == 'dark' ? styles.button.dark : styles.button.light}
              mode='contained'
              icon="delete"
              iconColor={colorScheme == 'dark' ? styles.darkIcon.color : styles.icon.color}
              onPress={() => deleteTask(index)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <StatusBar style='auto' />
    </View>
  );
};