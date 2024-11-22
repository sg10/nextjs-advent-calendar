"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function JsonModal({ value, name }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fieldValue, setFieldValue] = useState(value);
  const [notification, setNotification] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        throw new Error("Clipboard is empty");
      }
      const parsed = JSON.parse(text);
      setFieldValue(parsed);
      setNotification({
        show: true,
        success: true,
        message: "JSON pasted successfully!",
      });
    } catch (e) {
      setNotification({
        show: true,
        success: false,
        message:
          e instanceof SyntaxError
            ? "Your clipboard must contain valid JSON"
            : e.message || "Failed to read clipboard",
      });
    }
  };

  return (
    <div>
      <input
        name={name}
        className="hidden"
        value={fieldValue ? JSON.stringify(fieldValue) : ""}
        onChange={() => {}}
      />

      <Button
        isIconOnly
        size="sm"
        variant="light"
        onPress={onOpen}
        className="opacity-50 hover:opacity-100 w-fit px-2"
      >
        <FontAwesomeIcon icon={faCode} className="w-4 h-4 pr-1" /> JSON
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>JSON Data</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                    {JSON.stringify(fieldValue, null, 2)}
                  </pre>
                  <Button color="primary" size="sm" onClick={handlePaste}>
                    Paste JSON from Clipboard
                  </Button>
                  {notification.show && (
                    <div
                      className={`text-sm ${
                        notification.success ? "text-success" : "text-danger"
                      }`}
                    >
                      {notification.message}
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
