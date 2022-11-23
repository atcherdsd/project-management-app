export interface IBenefit {
  titleEn: string;
  descriptionEn: string;
  titleRu: string;
  descriptionRu: string;
}

export type Benefits = IBenefit[];

export type TeamMembersData = {
  nameEn: string;
  nameRu: string;
  roleEn: string;
  roleRu: string;
  githubNickname: string;
  githubLink: string;
  linkedinLink: string;
}[];
