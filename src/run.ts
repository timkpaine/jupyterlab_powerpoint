import {JupyterFrontEnd} from "@jupyterlab/application";
import {Dialog, showDialog} from "@jupyterlab/apputils";
import {PageConfig} from "@jupyterlab/coreutils";
import {IDocumentManager} from "@jupyterlab/docmanager";

import {IRequestResult, request} from "requests-helper";

export
function generateSample(app: JupyterFrontEnd, docManager: IDocumentManager): void {
    showDialog({
        buttons: [Dialog.cancelButton(), Dialog.okButton({ label: "Ok" })],
        title: "Generate Preview?",
    }).then((result) => {
        if (result.button.label === "Cancel") {
            return;
        }
        const context = docManager.contextForWidget(app.shell.currentWidget);
        let path = "";
        let model = {};
        if (context) {
            path = context.path;
            model = context.model.toJSON();
        }

        return new Promise((resolve) => {
            request("post",
                PageConfig.getBaseUrl() + "jupyterlab_powerpoint/generate",
                {},
                {path, model},
                ).then((res: IRequestResult) => {
                    if (res.ok) {
                        // todo
                    } else {
                        showDialog({
                            body: "Check the Jupyter logs for the exception.",
                            buttons: [Dialog.okButton({ label: "Ok" })],
                            title: "Something went wrong!",
                        }).then(() => {resolve(); });
                    }
                });
            });
        },
    );
}
