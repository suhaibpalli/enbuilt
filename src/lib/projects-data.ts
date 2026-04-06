export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface ProjectSection {
  title: string;
  description: string;
  images: string[];
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  area: string;
  typology: string;
  heroImage: string;
  blueprintImage: string;
  narrative: ProjectSection[];
  technicalSpecs: TechnicalSpec[];
  nextProjectSlug: string;
}

export const PROJECTS_DATA: Record<string, ProjectData> = {
  "meridian-tower": {
    id: "01",
    slug: "meridian-tower",
    title: "Meridian Tower",
    subtitle: "Vertical Urbanism & Monolithic Presence",
    location: "Chennai, India",
    year: "2024",
    area: "4,200 m²",
    typology: "Commercial / Office",
    heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&auto=format",
    blueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=85&auto=format",
    narrative: [
      {
        title: "The Vision",
        description: "The Meridian Tower represents a shift in vertical urbanism, focusing on a monolithic presence that anchors the skyline while providing a breathable environment for its inhabitants.",
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format"
        ]
      },
      {
        title: "Materiality",
        description: "A careful selection of raw concrete, basalt stone, and high-performance glass creates a dialogue between the structure's weight and the transparency of its functions.",
        images: [
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format"
        ]
      }
    ],
    technicalSpecs: [
      { label: "BIM Coordination", value: "Level 400" },
      { label: "Structural System", value: "Exposed Core-and-Shell" },
      { label: "Material Efficiency", value: "92%" },
      { label: "LEED Rating", value: "Platinum" }
    ],
    nextProjectSlug: "casa-volta"
  },
  "casa-volta": {
    id: "02",
    slug: "casa-volta",
    title: "Casa Volta",
    subtitle: "Sculptural Dwelling & Natural Integration",
    location: "Coimbatore, India",
    year: "2023",
    area: "680 m²",
    typology: "Residential / Villa",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85&auto=format",
    blueprintImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85&auto=format",
    narrative: [
      {
        title: "Adaptive Living",
        description: "Casa Volta integrates sculptural concrete forms with local vegetation, creating a home that evolves with the light and shadow of its surroundings.",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&auto=format"
        ]
      }
    ],
    technicalSpecs: [
      { label: "Thermal Massing", value: "Passive Cooling" },
      { label: "Natural Light", value: "85% Daylit" },
      { label: "Rainwater Harvest", value: "10k Liters" },
      { label: "Local Materials", value: "82%" }
    ],
    nextProjectSlug: "meridian-tower"
  }
};
