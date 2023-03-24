export type BlogStat = {
  views?: number;
  shares?: number;
  reactions?: number;
  reactionsDetails?: Reactions;
};

export type Reactions = {
  like?: number;
  celebrate?: number;
  support?: number;
  love?: number;
  insightful?: number;
  funny?: number;
};

export type ReactionKeys = keyof Reactions;
