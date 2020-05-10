declare namespace NTree {
  interface IProps {
    url: string;
  }

  interface INode {
    nodes: INode[];
    key: string;
    label: string;
  }
}