import {JupyterFrontEnd} from "@jupyterlab/application";
import {IDocumentManager} from "@jupyterlab/docmanager";

export
const POWERPOINT_CATEGORY = "Powerpoint";

export
const POWERPOINT_GENERATE_ID = "powerpoint:generate";

export
const POWERPOINT_GENERATE_CAPTION = "Generate Powerpoint";

export
const POWERPOINT_TOOL_CLASS = "PowerpointTool";

export
const POWERPOINT_TOOL_EDITOR_CLASS = "PowerpointEditor";

export
const POWERPOINT_TOOL_EDITOR_CLASS_INVALID = "PowerpointEditor-invalid";

export
function isEnabled(app: JupyterFrontEnd, docManager: IDocumentManager): () => boolean {
  return () => (app.shell.currentWidget &&
                docManager.contextForWidget(app.shell.currentWidget) &&
                docManager.contextForWidget(app.shell.currentWidget).model) ? true : false;
}
