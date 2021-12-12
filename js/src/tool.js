/* eslint-disable no-multi-assign */
import {PanelLayout} from "@lumino/widgets";

import {NotebookTools} from "@jupyterlab/notebook";

import {POWERPOINT_TOOL_CLASS} from "./utils";
import {PowerpointWidget} from "./widget";

export class PowerpointTool extends NotebookTools.Tool {
  notebookTracker = null;

  cellTools = null;

  widget = null;

  // tslint:disable-next-line:variable-name
  constructor(app, notebook_Tracker, cellTools) {
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
  onActiveCellChanged() {
    this.widget.currentActiveCell = this.cellTools.activeCell;
    this.widget.loadActiveCell();
  }

  // tslint:disable-next-line:no-empty
  onAfterShow() {}

  onAfterAttach() {
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

  onMetadataChanged() {
    this.widget.loadActiveCell();
  }
}
