export type ProjectImage = {
  src: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  campaign: string;
  client: string;
  images: ProjectImage[];
};

export type Slide = ProjectImage & {
  title: string;
  alt: string;
};

export const projects: Project[] = [
  {
    slug: "polish-vogue-january",
    title: "Polish Vogue — January",
    campaign: "January",
    client: "Polish Vogue",
    images: [
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_01_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_02_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_03_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_04_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_05_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_06_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_07_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_08_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_09_sRGB_2000px.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_10_sRGB_2000px_outtake.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_11_sRGB_2000px_outtake.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_12_sRGB_2000px_outtake.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_13_sRGB_2000px_outtake.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_15_sRGB_2000px_outtake.webp",
        width: 1500,
        height: 1875,
      },
      {
        src: "/projects/polish-vogue-january/Vogue-Polska_Twins_Nina-Raasch_Sophie-Ozra-Cloarec_16_sRGB_2000px_outtake.webp",
        width: 1500,
        height: 1875,
      },
    ],
  },
  {
    slug: "bottega-veneta-pan-daijing",
    title: "Bottega Veneta Special featuring Pan Daijing",
    campaign: "Pan Daijing",
    client: "Bottega Veneta",
    images: [
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_003_LR_sRGB_1800px.webp",
        width: 1500,
        height: 1200,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_004_LR_sRGB_1800px.webp",
        width: 1500,
        height: 1200,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_006_LR_sRGB_1800px.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_008_LR_sRGB_1800px.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_010_LR_sRGB_1800px.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_011_LR_sRGB_1800px.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_012_LR_sRGB_1800px.webp",
        width: 1500,
        height: 1200,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_018_LR_sRGB_1800px.webp",
        width: 1500,
        height: 1200,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_022_LR_sRGB_1800px.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_023_LR_sRGB_1800px_outtake.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_025_LR_sRGB_1800px.webp",
        width: 1457,
        height: 1800,
      },
      {
        src: "/projects/bottega-veneta-pan-daijing/NR-Magazine_Pan-Daijing_Nina-Raasch_026_LR_sRGB_1800px.webp",
        width: 1500,
        height: 1875,
      },
    ],
  },
  {
    slug: "elle-us-annie-shapero",
    title: "ELLE U.S. — Annie Shapero",
    campaign: "Annie Shapero",
    client: "ELLE U.S.",
    images: [
      {
        src: "/projects/elle-us-annie-shapero/Annie-Shapero_by_Nina-Raasch_01_sRGB_2000px.webp",
        width: 1500,
        height: 2000,
      },
      {
        src: "/projects/elle-us-annie-shapero/Annie-Shapero_by_Nina-Raasch_08_sRGB_2000px.webp",
        width: 1500,
        height: 2000,
      },
      {
        src: "/projects/elle-us-annie-shapero/Annie-Shapero_by_Nina-Raasch_09_sRGB_2000px.webp",
        width: 1500,
        height: 2000,
      },
    ],
  },
  {
    slug: "aesop-reaburn-campaign",
    title: "AESOP — Reaburn Campaign",
    campaign: "Reaburn Campaign",
    client: "AESOP",
    images: [
      {
        src: "/projects/aesop-reaburn-campaign/AESOP-Reaburn_Nina-Raasch_01_LR_sRGB_web.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/aesop-reaburn-campaign/AESOP-Reaburn_Nina-Raasch_02a_LR_sRGB_web.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/aesop-reaburn-campaign/AESOP-Reaburn_Nina-Raasch_03_LR_sRGB_web.webp",
        width: 1440,
        height: 1800,
      },
      {
        src: "/projects/aesop-reaburn-campaign/AESOP-Reaburn_Nina-Raasch_04_LR_sRGB_web.webp",
        width: 1440,
        height: 1800,
      },
    ],
  },
];

export type ProjectSection = Project & {
  startIndex: number;
};

export const projectSections: ProjectSection[] = projects.reduce<ProjectSection[]>(
  (sections, project) => {
    const previous = sections[sections.length - 1];
    const startIndex = previous
      ? previous.startIndex + previous.images.length
      : 0;
    return [...sections, { ...project, startIndex }];
  },
  [],
);

export const slides: Slide[] = projects.flatMap((project) =>
  project.images.map((image, index) => ({
    ...image,
    title: project.title,
    alt: `${project.title}, image ${index + 1}, photographed by Nina Raasch`,
  })),
);
