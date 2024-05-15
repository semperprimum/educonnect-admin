import { reactive } from "vue";

const state = reactive({
  currentModal: null,
  modalProps: {},
});

const ModalService = {
  open(modalName, props = {}) {
    state.currentModal = modalName;
    state.modalProps = props;
  },
  close() {
    state.currentModal = null;
    state.modalProps = {};
  },
  getCurrentModal() {
    return state.currentModal;
  },
  getModalProps() {
    return state.modalProps;
  },
};

export default ModalService;
