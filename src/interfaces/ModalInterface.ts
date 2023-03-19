export interface Option {
  name: string;
  function: () => void;
}

export interface ModalsProps {
  options: Option[];
}
