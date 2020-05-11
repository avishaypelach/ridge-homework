declare namespace NTree {
  interface IProps {
    url: any;
  }

  interface INode {
    nodes: INode[];
    key: string;
    label: string;
  }
}