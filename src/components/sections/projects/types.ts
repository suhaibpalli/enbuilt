export type ProjectCategory = "All" | "Residential" | "Commercial" | "Cultural" | "Interiors";

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, "All">;
  location: string;
  coords?: string;
  year: string;
  area: string;
  status: "Completed" | "Concept" | "Under Construction";
  index: string;
  /** Layout variant — controls aspect ratio and grid span */
  size: "tall" | "wide" | "square";
  imageSrc: string;
  imageAlt: string;
  href?: string;
}
