"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "@/app/component/Modal";
import Button from "@/app/component/Button";

type Categories = {
  id: number;
  name: string;
};

const UpdateCategory = ({ category }: { category: Categories }) => {
  const [name, setName] = useState(category.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/users/${category.id}`, {
      name: name,
    });
    setIsModalOpen(false);
    router.refresh();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="p-1 text-semibold fill-green-500 bg-green-100 hover:bg-green-200 flex gap-1 items-center rounded-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
        >
          <path d="M160-479q0 85 42.5 158T318-204q14 9 19.5 24.5T335-150q-8 15-24.5 19.5T279-134q-93-54-146-146T80-479q0-26 3.5-51t9.5-50l-13 8q-14 9-30 4.5T26-586q-8-14-3.5-30.5T41-641l121-70q14-8 30.5-3.5T217-696l70 120q8 14 3.5 30.5T272-521q-14 8-30.5 3.5T217-536l-34-59q-11 28-17 57t-6 59Zm320-321q-41 0-81 10.5T323-759q-15 8-31.5 5.5T267-770q-9-16-4-32.5t21-25.5q45-26 94.5-39T480-880q79 0 151.5 29.5T761-765v-15q0-17 11.5-28.5T801-820q17 0 28.5 11.5T841-780v140q0 17-11.5 28.5T801-600H661q-17 0-28.5-11.5T621-640q0-17 11.5-28.5T661-680h69q-46-57-111-88.5T480-800Zm242 531q38-44 58-97t20-111q0-17 11.5-30t28.5-13q17 0 28.5 13t11.5 30q0 65-20.5 125.5T800-239q-39 52-92.5 89T591-95l10 6q14 8 18 24.5T615-34q-8 14-24 18t-30-4L439-90q-14-8-18.5-24.5T424-145l70-121q8-14 24-18t30 4q14 8 18.5 24.5T563-225l-37 63q57-8 107.5-35.5T722-269Z" />
        </svg>
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="font-semibold">Edit Category</h2>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col my-6">
            <label htmlFor="name" className="pl-2 pb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              className="block w-full px-4 py-3 rounded-md ring-1 ring-inset ring-primary/20 focus:ring-2 focus:outline-none focus:ring-primary"
              onChange={(e) => setName(e.target.value)}
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

export default UpdateCategory;
