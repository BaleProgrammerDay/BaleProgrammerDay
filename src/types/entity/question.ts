export interface Question {
  id: string;
  cost: number;
  isActive: boolean;
  isAnswerd: boolean;
  isPurchased: boolean;
  isStarred: boolean;
  score: number;
}

export interface QuestionInfo {
  title: string;
  text: string;
  isStarred: boolean;
  score: number;
  isActive: boolean;
  isAnswerd: boolean;
  isPurchased: boolean;
  zip_file_url: string;
  has_zip: string;
  level: number;
  cost: number;
}
