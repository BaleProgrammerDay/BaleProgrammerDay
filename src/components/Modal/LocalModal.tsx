import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react";

import { Modal } from "./Modal";

import { timeout } from "~/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "~/store";

export interface ModalStates {
  exist: boolean;
  active: boolean;
}

interface LocalModalProps {
  onReset: () => void;
  states: ModalStates;
  setStates: Dispatch<SetStateAction<ModalStates>>;
  children: ReactNode;
}

export const LocalModal: FC<LocalModalProps> = ({
  states,
  setStates,
  onReset,
  children,
}) => {
  const { active } = states;

  const appDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setStates((prev) => ({ ...prev, active: true }));
  }, [setStates]);

  const closeHandler = async () => {
    onReset();
    setStates((prev) => ({ ...prev, active: false }));
    await timeout(500);
    setStates((prev) => ({ ...prev, exist: false }));
  };

  return (
    <Modal active={active} onClose={closeHandler}>
      {children}
    </Modal>
  );
};
