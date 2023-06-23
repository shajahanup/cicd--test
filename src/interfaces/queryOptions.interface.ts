export default interface QueryOptionsInterface {
  search: string;
  offset: number;
  numResults: number;
  categoryId?: number;
  type?: number;
}
