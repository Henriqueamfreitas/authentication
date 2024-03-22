export interface IPost{
  id: number,
  category: string,
  title: string,
  content: string,
  author: string,
}

export type TCreatePost = Omit<IPost, "id">
export type TUpdatePost = Partial<Omit<IPost, "id" | "author">>;
export type TCreateDataPost = Omit<TCreatePost, "author">;
