export type TAppTableItemTh = {
  // Текст
  text: string;
  // Дополнительные классы для span внутри thead
  addClasses: string[];
};

export type TAppTableItemTd = {
  id?: string | number;
  // Текст
  text: string;
};

export interface IAppTableItem {
  id?: string | number;
  th: TAppTableItemTh;
  tr: {
    // Дополнительные классы для span внутри tbody
    addClasses: string[];
    td: TAppTableItemTd[];
  };
}

export interface IAppTableProps {
  items?: IAppTableItem[];
}
