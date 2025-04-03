export interface ManhwaResponse {
  type: string;
  serviceName: string;
  version: string;
  startIndex: number;
  totalCount: number;
  titleNo: number;
  language: string;
  communityAuthorId: string;
  title: string;
  writingAuthorName: string;
  representGenre: string;
  restTerminationStatus: string;
  newTitle: boolean;
  ageGradeNotice: boolean;
  registerYmdt: number;
  thumbnail: string;
  thumbnailIpad: string;
  starScoreAverage: number;
  starScoreCount: number;
  readCount: number;
  favoriteCount: number;
  mana: number;
  rankingMana: number;
  likeitCount: number;
  lastEpisodeRegisterYmdt: number;
  synopsis: string;
  weekday: string[];
  totalServiceEpisodeCount: number;
  serviceStatus: string;
  badgeType: string;
  authorNeoId: string;
  thumbnailVertical: string;
  previewDisabled: boolean;
  isService: boolean;
  genreColor: string;
  representGenreSeoCode: string;
  titleForSeo: string;
  representGenreCssCode: string;
  webtoonType: string;
  starScoreTotal: number;
}

export interface ManhwaListResponse {
  data: ManhwaResponse[];
  totalCount: number;
  startIndex: number;
} 