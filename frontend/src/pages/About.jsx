export default function About() {
  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      <h1 className="text-4xl lg:text-3xl font-bold text-center">À propos</h1>
      <p className="text-center mb-8 text-xl lg:text-normal">
        Découvrez bientôt plus d’informations sur ce projet et son équipe.
      </p>

      <div className="border w-[300px] lg:w-[500px] mx-auto bg-secondary/5 border-secondary text-secondary rounded-lg py-16 px-8 mb-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">🚧 En construction 🚧</h2>
        <p className="text-center text-lg">
          Cette page est en cours de développement. Revenez prochainement pour
          en savoir plus !
        </p>
      </div>
    </div>
  );
}
