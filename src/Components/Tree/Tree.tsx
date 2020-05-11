import React, { useEffect, useState } from "react";
import Style from "./Tree.module.scss";
import { createTreeStructure } from "../../Utils/Dedicated/TreeUtils";
import TreeMenu from 'react-simple-tree-menu';
import 'react-simple-tree-menu/dist/main.css';

const NODES_TREE = "Nodes Tree"
const NO_DATA_TO_SHOW = "No data to show"

export default ({ url }: NTree.IProps) => {
  const [nodes, updateNodes] = useState<any>({});

  /**
   * Receive data when component mount and when url change.
   */
  useEffect(() => {
    updateNodes(url)
  }, [url])

  /**
   * Convert data to client friendly.
   */
  const nodesTree: NTree.INode[] = createTreeStructure(nodes);

  return (
    <div className={Style.container}>
      <h3>{NODES_TREE}</h3>
      {nodesTree ?
        <TreeMenu
          data={nodesTree}
          hasSearch={false}
        />
        : NO_DATA_TO_SHOW}
    </div>
  )
}