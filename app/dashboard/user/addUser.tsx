"use client";
import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import Modal from "@/app/component/Modal";
import Button from "@/app/component/Button";

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        role: "USER",
      });
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Button onClick={openModal}>Add User</Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="font-semibold">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-6">
            <label htmlFor="name" className="pl-2 pb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full px-4 py-3 rounded-md ring-1 ring-inset ring-primary/20 focus:ring-2 focus:outline-none focus:ring-primary"
              onChange={(e) => setNameValue(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col my-6">
            <label htmlFor="email" className="pl-2 pb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full px-4 py-3 rounded-md ring-1 ring-inset ring-primary/20 focus:ring-2 focus:outline-none focus:ring-primary"
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col my-6">
            <label htmlFor="password" className="pl-2 pb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="block w-full px-4 py-3 rounded-md ring-1 ring-inset ring-primary/20 focus:ring-2 focus:outline-none focus:ring-primary"
              onChange={(e) => setPasswordValue(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2 font-semibold">
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddUser;
