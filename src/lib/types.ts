interface Fields {
  handle: string;
  name: string;
  status: string;
}

export interface Person {
  id: string;
  createdTime: string;
  fields: Fields;
}
