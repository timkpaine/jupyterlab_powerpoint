import { Message } from "@phosphor/messaging";
import { PanelLayout } from "@phosphor/widgets";

import { JupyterFrontEnd } from "@jupyterlab/application";
import { INotebookTools, INotebookTracker, NotebookTools } from "@jupyterlab/notebook";
import { ObservableJSON } from "@jupyterlab/observables";

import { POWERPOINT_TOOL_CLASS } from "./utils";
import { PowerpointWidget } from "./widget";

export class PowerpointTool extends NotebookTools.Tool {
  public notebookTracker: INotebookTracker = null;
  public cellTools: INotebookTools = null;
  private widget: PowerpointWidget = null;

  // tslint:disable-next-line:variable-name
  constructor(app: JupyterFrontEnd, notebook_Tracker: INotebookTracker, cellTools: INotebookTools) {
    super();
    this.notebookTracker = notebook_Tracker;
    this.cellTools = cellTools;
    const layout = (this.layout = new PanelLayout());

    this.addClass(POWERPOINT_TOOL_CLASS);
    this.widget = new PowerpointWidget();
    this.widget.notebookTracker = notebook_Tracker;

    layout.addWidget(this.widget);
  }

  /**
   * Handle a change to the active cell.
   */
  protected onActiveCellChanged(msg: Message): void {
    this.widget.currentActiveCell = this.cellTools.activeCell;
    this.widget.loadActiveCell();
  }

  // tslint:disable-next-line:no-empty
  protected onAfterShow() {

  }

  protected onAfterAttach() {
    this.notebookTracker.currentWidget.context.ready.then(() => {
      this.widget.loadActiveCell();
    });
    this.notebookTracker.currentChanged.connect(() => {
      this.widget.loadActiveCell();
    });
    this.notebookTracker.currentWidget.model.cells.changed.connect(() => {
      this.widget.loadActiveCell();
    });
  }

  protected onMetadataChanged(msg: ObservableJSON.ChangeMessage): void {
    this.widget.loadActiveCell();
  }

}
