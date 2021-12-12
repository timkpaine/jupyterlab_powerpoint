/* eslint-disable no-console */
/* eslint-disable no-multi-assign */
import {PanelLayout, Widget} from "@lumino/widgets";

import {CodeCellModel} from "@jupyterlab/cells";
import {CodeEditorWrapper} from "@jupyterlab/codeeditor";
import {editorServices} from "@jupyterlab/codemirror";

// import {POWERPOINT_TOOL_CLASS, POWERPOINT_TOOL_EDITOR_CLASS} from "./utils";
import {POWERPOINT_TOOL_CLASS, POWERPOINT_TOOL_EDITOR_CLASS, POWERPOINT_TOOL_EDITOR_CLASS_INVALID} from "./utils";

/**
 * Widget holding the Powerpoint widget, container for options and editor
 *
 * @class      PowerpointWidget (name)
 */
// tslint:disable-next-line:max-classes-per-file
export class PowerpointWidget extends Widget {
  currentActiveCell = null;

  notebookTracker = null;

  editor = null;

  constructor() {
    super();
    this.node.classList.add(POWERPOINT_TOOL_CLASS);

    /* create layout */
    const layout = (this.layout = new PanelLayout());

    /* create codemirror editor */
    const editorOptions = {model: new CodeCellModel({}), factory: editorServices.factoryService.newInlineEditor};
    const editor = (this.editor = new CodeEditorWrapper(editorOptions));
    editor.addClass(POWERPOINT_TOOL_EDITOR_CLASS);
    editor.model.mimeType = "application/json";
    editor.model.value.changed.connect(() => {
      try {
        JSON.parse(this.editor.model.value.text);
        editor.removeClass(POWERPOINT_TOOL_EDITOR_CLASS_INVALID);
        this.saveActiveCell();
      } catch (e) {
        editor.addClass(POWERPOINT_TOOL_EDITOR_CLASS_INVALID);
      }
    }, this);
    layout.addWidget(editor);
  }

  fetchAndSet() {
    try {
      const json = JSON.parse(this.editor.model.value.text);
      this.currentActiveCell.model.metadata.set("jupyterlab_powerpoint", json);
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.warn("invalid JSON");
    }
  }

  loadActiveCell() {
    if (this.currentActiveCell !== null) {
      const metadata = this.currentActiveCell.model.metadata.get("jupyterlab_powerpoint") || {};
      this.editor.model.value.text = JSON.stringify(metadata, null, "\t");
    }
  }

  saveActiveCell() {
    /* if currentActiveCell exists */
    if (this.currentActiveCell !== null) {
      try {
        const json = JSON.parse(this.editor.model.value.text);
        this.currentActiveCell.model.metadata.set("jupyterlab_powerpoint", json);
      } catch (e) {
        // tslint:disable-next-line: no-console
        console.warn("invalid JSON");
      }
    }
  }

  deleteActiveCell() {
    if (this.currentActiveCell !== null) {
      this.currentActiveCell.model.metadata.delete("jupyterlab_powerpoint");
    }
  }

  get editorWidget() {
    return this.editor;
  }
}
