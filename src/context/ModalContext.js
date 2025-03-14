import React, { createContext, useState } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={hideModal}>
        <TouchableOpacity style={styles.overlay} onPress={hideModal}>
          <View style={styles.modal}>{modalContent}</View>
        </TouchableOpacity>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => React.useContext(ModalContext);

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: 'red',
    height: 200,
    width: 400,
    position: 'absolute', // Ensure it is positioned on the screen
    top: 0, // You can adjust this to change its position
    zIndex: 1000, // To make sure it appears above other components
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modal: {
    position: 'absolute',
    top: '6%',
    right: '1%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,

    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
