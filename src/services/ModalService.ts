import { reactive } from "vue";

const state = reactive<{ currentModal: string | null, modalProps: {} }>({
  currentModal: null,
  modalProps: {},
});

const ModalService = {
  open(modalName: string, props = {}) {
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
