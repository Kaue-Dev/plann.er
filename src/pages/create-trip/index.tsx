import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InviteGuestsModal } from "./components/InviteGuestsModal";
import { ConfirmTripModal } from "./components/ConfirmTripModal";

import { DestinationAndDateInput } from "./components/inputs/DestinationAndDateInput";
import { InviteGuestsInput } from "./components/inputs/InviteGuestsInput";

export const CreateTripPage = () => {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState(["primeiro@contato.com.br"]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const data = new FormData(ev.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      alert("Este e-mail já foi adicionado!");
      ev.currentTarget.reset();
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    ev.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailsToInvite(newEmailList);
  }

  function createTrip(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    navigate("/trips/123")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="Plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateInput
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsInput 
              openGuestsModal={openGuestsModal} 
              openConfirmTripModal={openConfirmTripModal} 
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>
        
        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.et você automanticamente concorda <br /> com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a></p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal 
        emailsToInvite={emailsToInvite} 
          closeGuestsModal={closeGuestsModal} 
          addNewEmailToInvite={addNewEmailToInvite} 
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  );
};