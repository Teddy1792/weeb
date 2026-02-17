import { motion } from "framer-motion";
import Button from "../components/ButtonCustom";

const logos = [
  { id: 1, src: "/logo1.svg", alt: "Logo 1" },
  { id: 2, src: "/logo2.svg", alt: "Logo 2" },
  { id: 3, src: "/logo3.svg", alt: "Logo 3" },
  { id: 4, src: "/logo4.svg", alt: "Logo 4" },
  { id: 5, src: "/logo5.svg", alt: "Logo 5" },
];

export default function Home() {
  return (
    <div className="lg:p-8 flex flex-col w-[90%] lg:w-[70%] justify-center mx-auto gap-4">
      <h1 className="text-4xl font-bold text-center">
        Explorez le <span className="text-secondary font-extralight">Web</span>{" "}
        sous toutes <br />
        ses{" "}
        <span className="underline underline-offset-8 decoration-secondary">
          facettes
        </span>
      </h1>
      <p className="text-center lg:text-xs my-4">
        Le monde du web évolue constamment, et nous sommes là pour vous guider à
        travers ses tendances, technologies et meilleures pratiques. Que vous
        soyez développeur, designer ou passionné du digital, notre blog vous
        offre du contenu de qualité pour rester à la pointe.
      </p>

      <div className="flex justify-center gap-4 my-10 lg:my-0">
        <Button text="Connexion" to="/blog" />
        <button className="border border-white rounded-sm font-bold text-xs py-2 px-3 hover:scale-110 transition ease-in-out duration-300 cursor-pointer">
          S'abonner à la newsletter
        </button>
      </div>

      {/* Première image : arrive de la gauche */}
      <motion.img
        src="/Desktop1.svg"
        alt="Illustration du desktop"
        className="mx-auto"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <h1 className="text-center text-4xl font-bold my-8">
        Ils nous font confiance
      </h1>
      <div className="flex gap-10 lg:mb-20 overflow-x-auto lg:overflow-x-visible lg:justify-center scrollbar-hide">
        {logos.map((logo) => (
          <img
            key={logo.id}
            src={logo.src}
            alt={logo.alt}
            className="h-5 w-auto flex-shrink-0"
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row overflow-hidden lg:overflow-visible">
        <div className="lg:m-10 m-4 lg:w-[50%] lg:text-xs font-bold">
          <h2 className="lg:whitespace-nowrap my-4">
            DES RESSOURCES POUR TOUS LES NIVEAUX
          </h2>
          <h1 className="text-secondary text-4xl font-bold my-4">
            <span className="lg:whitespace-nowrap">
              Apprenez <span className="text-white">et</span>
            </span>{" "}
            progressez
          </h1>
          <p className="lg:text-xs font-light my-4">
            Que vous débutiez en développement web ou que vous soyez un expert
            cherchant à approfondir vos connaissances, nous vous proposons des
            tutoriels, guides et bonnes pratiques pour apprendre efficacement.
          </p>
          <div className="flex my-4 items-center group cursor-pointer">
            <p className="lg:text-sm group-hover:text-secondary transition ease-in-out duration-300">
              Explorer les ressources
            </p>
            <img
              src="/arrow-right.svg"
              alt="fleche vers la droite"
              className="group-hover:rotate-90 transition ease-in-out duration-300"
            />
          </div>
        </div>

        {/* Deuxième image : arrive de la droite */}
        <motion.img
          src="/Desktop1.svg"
          alt="Illustration du desktop"
          className="lg:w-[60%]"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="flex flex-col-reverse lg:flex-row">
        {/* Troisième image : arrive de la gauche */}
        <motion.img
          src="/squares.svg"
          alt="carrés"
          className="lg:w-[40%]"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <div className="lg:m-10 m-4 lg:w-[50%] lg:text-xs font-bold">
          <h2 className="lg:whitespace-nowrap my-4">
            LE WEB, UN ÉCOSYSTÈME EN CONSTANTE ÉVOLUTION
          </h2>
          <h1 className="text-4xl font-bold my-4 lg:whitespace-nowrap">
            Restez informé des <br /> dernières{" "}
            <span className="text-secondary">tendances</span>
          </h1>
          <p className="lg:text-xs font-light my-4">
            Chaque semaine, nous analysons les nouveautés du web : frameworks
            émergents, bonnes pratiques SEO, accessibilité, et bien plus encore.
            Ne manquez aucune actualité du digital !
          </p>
          <div className="flex my-4 items-center group cursor-pointer">
            <p className="lg:text-sm group-hover:text-secondary transition ease-in-out duration-300">
              Lire les articles récents
            </p>
            <img
              src="/arrow-right.svg"
              alt="fleche vers la droite"
              className="group-hover:rotate-90 transition ease-in-out duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
