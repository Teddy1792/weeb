const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Pricing", href: "#" },
      { name: "Overview", href: "#" },
      { name: "Browse", href: "#" },
      { name: "Accessibility", href: "#" },
      { name: "Five", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Brainstorming", href: "#" },
      { name: "Ideation", href: "#" },
      { name: "Wireframing", href: "#" },
      { name: "Research", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Tutorials", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Press", href: "#" },
      { name: "Events", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
];

const socialLinks = [
  { name: "YouTube", src: "/youtube.svg", alt: "YouTube", href: "#" },
  { name: "Facebook", src: "/facebook.svg", alt: "Facebook", href: "#" },
  { name: "X", src: "/twitter.svg", alt: "X (Twitter)", href: "#" },
  { name: "Instagram", src: "/instagram.svg", alt: "Instagram", href: "#" },
  { name: "LinkedIn", src: "/linkedin.svg", alt: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full max-w-none bg-white border-t border-gray-200 flex flex-col mt-20">
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="mx-auto lg:text-left font-bold text-4xl lg:text-2xl text-black py-10 lg:px-12 lg:py-10">
          weeb
        </div>
        <div className="mx-auto py-8 lg:py-12 lg:grid lg:grid-cols-4 lg:gap-24">
          {footerLinks.map((section) => (
            <div key={section.title} className="mb-12">
              <h3 className="lg:text-xs font-semibold text-gray-500 uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2 lg:text-xs text-black">
                {section.links.map((link) => (
                  <li key={link.name} className="mb-4">
                    <a className="block text-gray-700 hover:scale-110 transition ease-in-out duration-300 cursor-pointer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-center border-t border-gray-200 w-[85%] mx-auto"></div>
        <div className="flex flex-col lg:flex-row items-center my-8 justify-around gap-8">
          <div className="flex justify-start lg:text-center text-xl lg:text-sm text-black">
            © 2025 Weeb, Inc. All <br className="lg:hidden" /> rights reserved.
          </div>
          <div className="flex gap-4">
            {socialLinks.map((icon) => (
              <div key={icon.name} className="mb-4">
                <a href={icon.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="h-8 w-8 lg:h-4 lg:w-4 hover:scale-110 transition ease-in-out duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
