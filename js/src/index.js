import {ICommandPalette} from "@jupyterlab/apputils";
import {IDocumentManager} from "@jupyterlab/docmanager";
import {ILauncher} from "@jupyterlab/launcher";
import {INotebookTools, INotebookTracker} from "@jupyterlab/notebook";

import "../style/index.css";
import {activate} from "./activate";

const extension = {
  activate,
  autoStart: true,
  id: "jupyterlab_powerpoint",
  optional: [ILauncher],
  requires: [IDocumentManager, ICommandPalette, INotebookTracker, INotebookTools],
};

export default extension;
export {activate as _activate};
