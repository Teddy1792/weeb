import FormInput from "../components/FormInput";
import Button from "../components/ButtonCustom";

export default function Signup() {
  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      <h1 className="text-4xl lg:text-3xl font-bold text-center">
        Inscription
      </h1>
      <p className="text-center mb-8 text-xl lg:text-normal">
        Créez votre compte pour accéder à votre espace personnel et profiter de
        toutes les fonctionnalités.
      </p>

      <form className="w-[300px] lg:w-[500px] mx-auto border bg-secondary/5 border-secondary text-secondary rounded-lg py-6 px-8 mb-10 flex flex-col gap-8">
        {/* Nom */}
        <FormInput placeholder="Nom" type="text" />

        {/* Email */}
        <FormInput placeholder="Email" type="email" />

        {/* Password */}
        <FormInput placeholder="Mot de passe" passwordToggle={true} />

        {/* Confirm Password */}
        <FormInput
          placeholder="Confirmer le mot de passe"
          passwordToggle={true}
        />

        {/* Bouton */}
        <Button text="Connexion" to="/signup" />
      </form>
    </div>
  );
}
