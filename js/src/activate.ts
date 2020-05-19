import {JupyterFrontEnd} from "@jupyterlab/application";
import {ICommandPalette} from "@jupyterlab/apputils";
import {IDocumentManager} from "@jupyterlab/docmanager";
import {INotebookTools, INotebookTracker} from "@jupyterlab/notebook";

import {generateSample} from "./run";
import {PowerpointTool} from "./tool";
import {isEnabled, POWERPOINT_CATEGORY, POWERPOINT_GENERATE_CAPTION, POWERPOINT_GENERATE_ID} from "./utils";

export
function activate(app: JupyterFrontEnd,
                  docManager: IDocumentManager,
                  palette: ICommandPalette,
                  tracker: INotebookTracker,
                  cellTools: INotebookTools): void {

  /* Add to cell tools sidebar */
  const testsTool = new PowerpointTool(app, tracker, cellTools);
  cellTools.addItem({ tool: testsTool, rank: 1.9 });

  /* Add to commands to sidebar */
  palette.addItem({command: POWERPOINT_GENERATE_ID, category: POWERPOINT_CATEGORY});

  app.commands.addCommand(POWERPOINT_GENERATE_ID, {
    caption: POWERPOINT_GENERATE_CAPTION,
    execute: (args) => {
      generateSample(app, docManager);
    },
    isEnabled: isEnabled(app, docManager),
    label: POWERPOINT_GENERATE_CAPTION,
  });
}
