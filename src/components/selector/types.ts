export interface Props {
  data: CategoryProps[];
  onPress?: (name: string, selectedName: string) => any | void;
}

export interface CategoryProps {
  name: string;
}
