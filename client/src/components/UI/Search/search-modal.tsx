"use client";

import { useModal } from "@/lib/providers/ModalProvider";
import Modal from "../../Common/Modal";

const SearchModal = () => {
  const { hideModal } = useModal();

  return (
    <Modal
      onClose={hideModal}
      className="bg-white shadow-2xl rounded-md md:w-1/2 p-8 w-full"
    ></Modal>
  );
};

export default SearchModal;
