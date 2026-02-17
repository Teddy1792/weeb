import FormInput from "../components/FormInput";
import Button from "../components/ButtonCustom";

export default function Contact() {
  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      <h1 className="text-4xl lg:text-3xl font-bold text-center">
        Votre avis compte !
      </h1>
      <p className="text-center mb-8 text-xl lg:text-normal">
        Votre retour est essentiel pour nous améliorer ! Partagez votre
        expérience, dites-nous ce que vous aimez et ce que nous pourrions
        améliorer. Vos suggestions nous aident à faire de ce blog une ressource
        toujours plus utile et enrichissante.
      </p>

      <form className="border items-center mx-auto w-[300px] lg:w-[500px] bg-secondary/5 border-secondary text-secondary rounded-lg py-6 px-8 mb-10 flex flex-col gap-8">
        {/* Nom + Prénom */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="lg:w-[45%]">
            <FormInput placeholder="Nom" type="text" />
          </div>
          <div className="lg:w-[45%]">
            <FormInput placeholder="Prénom" type="text" />
          </div>
        </div>

        {/* Email + Sujet */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="lg:w-[45%]">
            <FormInput placeholder="Email" type="email" />
          </div>
          <div className="lg:w-[45%]">
            <FormInput placeholder="Sujet" type="text" />
          </div>
        </div>

        {/* Message */}
        <div className="w-full">
          <FormInput placeholder="Message" type="text" />
        </div>

        {/* Bouton */}
        <Button text="Envoyer" type="submit" />
      </form>
    </div>
  );
}
