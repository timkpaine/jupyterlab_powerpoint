import { PanelLayout, Widget } from "@lumino/widgets";

import { Cell, CodeCellModel } from "@jupyterlab/cells";
import { CodeEditorWrapper} from "@jupyterlab/codeeditor";
import { editorServices } from "@jupyterlab/codemirror";
import { INotebookTracker } from "@jupyterlab/notebook";

// import {POWERPOINT_TOOL_CLASS, POWERPOINT_TOOL_EDITOR_CLASS} from "./utils";
import {POWERPOINT_TOOL_CLASS, POWERPOINT_TOOL_EDITOR_CLASS, POWERPOINT_TOOL_EDITOR_CLASS_INVALID} from "./utils";

/**
 * Widget holding the Powerpoint widget, container for options and editor
 *
 * @class      PowerpointWidget (name)
 */
// tslint:disable-next-line:max-classes-per-file
export class PowerpointWidget extends Widget {
    public currentActiveCell: Cell = null;
    public notebookTracker: INotebookTracker = null;
    private editor: CodeEditorWrapper = null;

    constructor() {
        super();
        this.node.classList.add(POWERPOINT_TOOL_CLASS);

        /* create layout */
        const layout = (this.layout = new PanelLayout());

        /* create codemirror editor */
        const editorOptions = { model: new CodeCellModel({}), factory: editorServices.factoryService.newInlineEditor };
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

    public fetchAndSet(): void {
        try {
            const json = JSON.parse(this.editor.model.value.text);
            this.currentActiveCell.model.metadata.set("jupyterlab_powerpoint", json);
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.warn("invalid JSON");
        }
    }

    public loadActiveCell(): void {
        if (this.currentActiveCell !== null) {
            const metadata =
                this.currentActiveCell.model.metadata.get("jupyterlab_powerpoint") as {[key: string]: string} || {};
            this.editor.model.value.text = JSON.stringify(metadata, null, "\t");
        }
    }

    public saveActiveCell(): void {
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

    public deleteActiveCell(): void {
        if (this.currentActiveCell !== null) {
            this.currentActiveCell.model.metadata.delete("jupyterlab_powerpoint");
        }
    }

    get editorWidget(): CodeEditorWrapper {
        return this.editor;
    }
}
