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
        description: "The Meridian Tower represents a shift in vertical urbanism, focusing on a monolithic presence that anchors the skyline while providing a breathable environment for its inhabitants. Conceived as a single gesture of structural honesty, the tower's exposed concrete core becomes its defining aesthetic.",
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format"
        ]
      },
      {
        title: "Materiality",
        description: "A careful selection of raw concrete, basalt stone, and high-performance glass creates a dialogue between the structure's weight and the transparency of its functions. Each material weathering differently — building a patina of time into the architecture itself.",
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
        description: "Casa Volta integrates sculptural concrete forms with local vegetation, creating a home that evolves with the light and shadow of its surroundings. The central courtyard breathes life into every room, blurring the boundary between the built and the wild.",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&auto=format"
        ]
      },
      {
        title: "The Courtyard",
        description: "Oriented to capture prevailing breezes and maximise natural shade, the courtyard serves as the home's thermal engine. Rain harvesting channels are integrated as both infrastructure and sculptural element.",
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format"
        ]
      }
    ],
    technicalSpecs: [
      { label: "Thermal Massing", value: "Passive Cooling" },
      { label: "Natural Light", value: "85% Daylit" },
      { label: "Rainwater Harvest", value: "10k Liters" },
      { label: "Local Materials", value: "82%" }
    ],
    nextProjectSlug: "lattice-pavilion"
  },
  "lattice-pavilion": {
    id: "03",
    slug: "lattice-pavilion",
    title: "Lattice Pavilion",
    subtitle: "Public Cultural Centre & Civic Anchor",
    location: "Bangalore, India",
    year: "2023",
    area: "1,900 m²",
    typology: "Cultural / Public",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=85&auto=format",
    blueprintImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=85&auto=format",
    narrative: [
      {
        title: "The Lattice",
        description: "The pavilion's primary skin is a structural lattice of cast iron and reclaimed timber — a reinterpretation of the traditional jali screen. It filters light into ever-shifting patterns across the interior, making the building a sundial of sorts.",
        images: [
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format"
        ]
      },
      {
        title: "Civic Presence",
        description: "Designed as a village square under a roof, the pavilion accommodates art exhibitions, performances, and markets — a democratic space that belongs to its city. The boundary between inside and outside dissolves deliberately.",
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&auto=format"
        ]
      }
    ],
    technicalSpecs: [
      { label: "Structural System", value: "Lattice Shell" },
      { label: "Reclaimed Timber", value: "340 m³" },
      { label: "Carbon Reduction", value: "61%" },
      { label: "Acoustic Performance", value: "NRC 0.8" }
    ],
    nextProjectSlug: "void-house"
  },
  "void-house": {
    id: "04",
    slug: "void-house",
    title: "The Void House",
    subtitle: "Minimalist Courtyard Villa & Meditative Space",
    location: "Pondicherry, India",
    year: "2022",
    area: "420 m²",
    typology: "Residential / Courtyard",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85&auto=format",
    blueprintImage: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1800&q=85&auto=format",
    narrative: [
      {
        title: "Subtractive Logic",
        description: "The Void House is conceived through subtraction rather than addition. Beginning as a solid mass, spaces are carved away — revealing a home defined by what is absent as much as by what is present. The central void becomes sky, garden, and lung.",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80&auto=format"
        ]
      },
      {
        title: "Slow Architecture",
        description: "Built entirely with local limestone and lime plaster, the house gains its character slowly. The material breathes, stains, and cracks in ways that are designed for. Over years it becomes inseparable from its site.",
        images: [
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format"
        ]
      }
    ],
    technicalSpecs: [
      { label: "Wall System", value: "Limestone Ashlar" },
      { label: "Thermal Mass", value: "High / Passive" },
      { label: "Interior Temp Δ", value: "8°C Below Ambient" },
      { label: "Local Labour", value: "100%" }
    ],
    nextProjectSlug: "forum-one"
  },
  "forum-one": {
    id: "05",
    slug: "forum-one",
    title: "Forum One",
    subtitle: "Corporate Headquarters & Urban Campus",
    location: "Hyderabad, India",
    year: "2022",
    area: "8,400 m²",
    typology: "Commercial / Campus",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=85&auto=format",
    blueprintImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85&auto=format",
    narrative: [
      {
        title: "Campus as City",
        description: "Forum One rejects the corporate campus archetype. Instead of an isolated compound, the project weaves itself into the surrounding urban fabric — streets pass through it, markets occupy its lower levels, and its roofscape is a public park.",
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format"
        ]
      },
      {
        title: "Bioclimatic Engineering",
        description: "The building's orientation, shading fins, and cross-ventilation system were modelled over 18 months using computational fluid dynamics — reducing mechanical cooling loads by 44% against code baseline.",
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format"
        ]
      }
    ],
    technicalSpecs: [
      { label: "BIM Coordination", value: "Level 500" },
      { label: "Cooling Reduction", value: "44%" },
      { label: "Green Cover", value: "3,200 m²" },
      { label: "GRIHA Rating", value: "5 Star" }
    ],
    nextProjectSlug: "studio-nave"
  },
  "studio-nave": {
    id: "06",
    slug: "studio-nave",
    title: "Studio Nave",
    subtitle: "Artist Live-Work Loft & Material Palette",
    location: "Mumbai, India",
    year: "2021",
    area: "290 m²",
    typology: "Interiors / Adaptive Reuse",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85&auto=format",
    blueprintImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85&auto=format",
    narrative: [
      {
        title: "Found Space",
        description: "An abandoned textile mill warehouse became a live-work studio for a ceramicist. The intervention was deliberately minimal: removing false ceilings to reveal original timber roof trusses, sandblasting brick, and inserting a steel mezzanine that barely touches its host.",
        images: [
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80&auto=format"
        ]
      },
      {
        title: "The Material Palette",
        description: "The material choices are a direct response to the client's craft: kiln-fired brick, raw steel, aged teak, and Kadappa stone. Every surface has weight and history — the architecture is itself a study in material honesty.",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format"
        ]
      }
    ],
    technicalSpecs: [
      { label: "Structural Intervention", value: "Minimal / Reversible" },
      { label: "Heritage Retention", value: "94%" },
      { label: "Adaptive Reuse", value: "Full Shell" },
      { label: "Natural Ventilation", value: "Cross-Flow" }
    ],
    nextProjectSlug: "meridian-tower"
  }
};
