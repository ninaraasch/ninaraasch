export type ContactLink = {
  label: string;
  text: string;
  href: string;
};

export type ContactList = {
  label: string;
  items: string[];
};

export const intro = "Photographer working between London and Berlin";

export const instagramUrl = "https://www.instagram.com/ninaraasch/";

export const links: ContactLink[] = [
  {
    label: "email",
    text: "contact@ninaraasch.com",
    href: "mailto:contact@ninaraasch.com",
  },
  {
    label: "instagram",
    text: "@ninaraasch",
    href: instagramUrl,
  },
  {
    label: "updates",
    text: "models.com",
    href: "https://models.com/people/nina-raasch",
  },
];

export const lists: ContactList[] = [
  {
    label: "selected clients",
    items: [
      "Mytheresa",
      "Mr. Porter",
      "AESOP",
      "Aeyde",
      "Nike",
      "Adidas",
      "Carhartt",
      "Levi's",
      "Polaroid",
      "Hugo Boss",
      "Escada",
      "H&M",
      "Closed",
      "Edited",
      "Liebeskind",
      "Zalando",
      "ASOS",
      "Catrice",
      "Authentic Beauty Concept",
      "Estée Lauder",
      "i-D",
      "Vogue",
      "Interview",
      "Sleek",
      "Numéro",
      "Wonderland",
      "10 Magazine",
      "ELLE",
    ],
  },
  {
    label: "selected artists",
    items: [
      "Kate Bosworth",
      "Serge Gnabry",
      "Leni Klum",
      "Ben Whishaw",
      "Ai Weiwei",
      "Milly Alcock",
      "Camille Razat",
      "Leigh-Anne Pinnock",
      "Omar Rudberg",
      "Matt Champion",
      "Emilia Schüle",
      "Katharina Schüttler",
      "Karoline Herfurth",
      "Katja Riemann",
      "Langston Uibel",
      "Maximilian Mundt",
      "Jella Haase",
      "Lena Klenke",
      "Jannik Schümann",
      "Yseult",
      "Ellen Allien",
      "Anja Schneider",
      "Patrick Mason",
      "Lie Ning",
      "Caro Daur",
      "Anetha",
      "Pan Daijing",
      "Asha Banks",
      "Luna Wedler",
      "Norbert Bisky",
      "Annie Shapero",
    ],
  },
  {
    label: "magazine specials",
    items: [
      "Louis Vuitton",
      "Dior",
      "Chanel",
      "Bottega Veneta",
      "BVLGARI",
      "Omega",
      "Rabanne",
      "Longchamp",
      "Ole Lynggaard",
    ],
  },
];

export const exhibitions: string[] = [
  "First Thursday | 2024 | P61 Gallery | Berlin",
  "Palm Photo Prize | 2022 | 1014 Gallery | London",
  "Young Berlin | Soho House | 2019 | Berlin",
  "VI | Blogfabrik | 2019 | Berlin",
  "Werkschau at Frankfurter Buchmesse | 2017 | Frankfurt am Main",
  "Morocco | Spotte Art Boutique | 2017 | New York City",
  "Acreati x Forza Fashion House Maastricht | Entre Deux | 2016 | Maastricht",
  "Glance vs Gaze | Kunstquartier Bethanien | 2016 | Berlin",
  "Haiti | Schindler Hallen | 2016 | Berlin",
  "Haiti | Ritter Butzke Art Space | 2016 | Berlin",
  "If You Leave: IYL Showcase | Soda Books | 2016 | Berlin",
  "If You Leave: IYL Showcase | Hatch London | 2015 | London",
  "Football Against Homophobia | 3rd prize winner | Lette Verein | 2015 | Berlin",
  "Pinhole Landscapes | Spotte Art Boutique | 2015 | New York City",
  "Close Up! | C/O Berlin Foundation Amerika Haus | 2015 | Berlin",
  "Waves | Galerie Werkraum Bild und Sinn | 2015 | Berlin",
];
