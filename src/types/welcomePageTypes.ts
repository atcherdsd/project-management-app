export interface IBenefit {
  titleEn: string;
  descriptionEn: string;
  titleRu: string;
  descriptionRu: string;
}

export type Benefits = IBenefit[];

export type TeamMembersData = {
  name: string;
  role: string;
  githubNickname: string;
  githubLink: string;
  linkedinLink: string;
}[];
