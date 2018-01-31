export type Book = {
  id:number, 
  title:string, 
  year:Date
}
export type Author = {
  name:string,
  gender:string,
  birth:Date
  id:number
}
export type AuthorBooks = {
  author:Author,
  books:Book[]
}