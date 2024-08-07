"use client";
import { useState } from "react";
import axios from "axios";
import Modal from "@/app/component/Modal";
import Button from "@/app/component/Button";

type User = {
  id: string;
  name: string;
};

const DeleteUser = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="p-1 text-semibold fill-red-500 bg-red-100 hover:bg-red-200 flex gap-1 items-center rounded-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z" />
        </svg>
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="font-semibold">Delete User</h2>
        <p className="my-6">
          Are sure to delete <b>{user.name}</b>?
        </p>
        <div className="flex justify-end gap-2 font-semibold">
          <Button onClick={closeModal} variant="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(user.id)}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteUser;
