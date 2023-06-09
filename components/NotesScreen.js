import React, { useEffect } from 'react';
import { View, useColorScheme, Keyboard, FlatList, Alert, StatusBar } from 'react-native';
import { styles } from '../App.styles.js';
import { Button, TextInput, Dialog, Portal, IconButton, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notes({navigation}) {
  const [notes, setNotes] = React.useState([]);
  const [textInputValue, setTextValue] = React.useState('');
  const [visibleDialog, setDialogVisible] = React.useState(false);
  const [visibleInput, setInputVisible] = React.useState(false);

  const hideDialog = () => setDialogVisible(false);
  const showDialog = () =>  setDialogVisible(true);

  const hideInput = () => setInputVisible(false);
  const showInput = () => setInputVisible(true);

  const colorScheme = useColorScheme();

  //#region Functions

  useEffect(() => {
    async function loadNotes() {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        setNotes(savedNotes != null ? JSON.parse(savedNotes) : []);
      }
      catch (error) {
        Alert.alert('Error', 'There was an error loading notes');
      }
    };
    loadNotes();

    // header button
    navigation.setOptions({
      headerRight: () => (
        <Button 
          onPress={showDialog}
          mode='contained-tonal'
        >
          Remove all notes
        </Button>
      )
    });
  }, []);

  // updating notes in storage
  useEffect(() => {
    try {
      AsyncStorage.setItem('notes', JSON.stringify(notes));
    }
    catch (error) {
      Alert.alert('Error', 'There was an error saving notes notes');
    };
  }, [notes])

  const addNote = async () => {
    if (textInputValue && textInputValue.trim() !== "") {
      const newNote = {id: Math.random(), name: textInputValue};
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setTextValue('');

      hideInput();
    }
  };

  const updateNote = async (noteIndex, newNoteText) => {
    setNotes(notes.map((note, index) => {
      if (index == noteIndex) {
        return Object.assign({}, note, {name: newNoteText});
      }
      return note;
    })
    );
  };

  const deleteNote = async (noteIndex) => {
    setNotes(notes.filter((note, index) => index !== noteIndex));
  }

  const removeAllNotes = async () => {
    setNotes([]);
    hideDialog();
  }

  //#endregion

  return (
    <View style={styles.container}>
      {/* Dialog */}
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
        <Dialog.Title>Do you really want to remove all your notes?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={removeAllNotes}>Yes</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={hideDialog}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Bottom input  */}
      <View style={styles.addTaskContainer}>
        {/* visible when FAB is pressed */}
        {visibleInput ? 
        <TextInput
          visible={visibleInput}
          autoFocus={true}
          style={styles.textInput}
          value={textInputValue}
          label={'enter your note here'}
          underlineColorAndroid={'transparent'}
          onChangeText={text => setTextValue(text)}
        /> : null}
        
        <FAB 
          style={styles.fab}
          icon="plus"
          size='medium'
          onPress={() => {
            showInput();
            addNote();
            Keyboard.dismiss(); // hides keyboard and removes focus
          }} 
        />
      </View>

      {/* Notes */}
      <FlatList 
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        data={notes}
        renderItem={({item, index}) => (
          <View 
            key={item.id}
            style={[styles.tasksContainer, 
              colorScheme == 'dark' ? styles.tasksContainer.dark : styles.tasksContainer.light ]} 
            >
              <TextInput 
                defaultValue={item.name} 
                multiline={true}
                mode='flat'
                underlineColor="transparent"
                outlineColor="transparent"
                underlineColorAndroid="transparent"
                spellCheck={false} // IOS only
                style={[
                  styles.taskTextInput,
                  colorScheme == 'dark' ? styles.taskTextInput.dark : styles.taskTextInput.light
                ]}
                contentStyle={[
                  {width: 280},
                  colorScheme == 'dark' ? styles.textFieldDark : styles.textFieldLight
                ]}
                onEndEditing={(event) => {
                  updateNote(index, event.nativeEvent.text);
                }}
              />
              <IconButton 
                icon='delete'
                mode='contained'
                style={colorScheme == 'dark' ? styles.button.dark : styles.button.light}
                iconColor={colorScheme == 'dark' ? styles.darkIcon.color : styles.icon.color}
                onPress={() => deleteNote(index)}
              />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

     <StatusBar style='auto' />
    </View>
  )
}