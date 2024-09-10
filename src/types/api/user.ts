export interface FileLocation {
  fileId: string;
}

export interface AvatarImage {
  fileLocation: FileLocation | undefined;
  width: number;
  height: number;
  fileSize: number;
}

export interface ApiUser {
  id: number;
  name: string;
  avatar: AvatarImage | undefined;
  team: string | undefined;
}
