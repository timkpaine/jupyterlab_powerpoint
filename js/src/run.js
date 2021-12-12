import {Dialog, showDialog} from "@jupyterlab/apputils";
import {PageConfig} from "@jupyterlab/coreutils";
import {request} from "requests-helper";

export const generateSample = async (app, docManager) => {
  const result = await showDialog({
    buttons: [Dialog.cancelButton(), Dialog.okButton({label: "Ok"})],
    title: "Generate Preview?",
  });

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
  const res = await request("post", `${PageConfig.getBaseUrl()}jupyterlab_powerpoint/generate`, {}, {path, model});
  if (res.ok) {
    // todo
  } else {
    await showDialog({
      body: "Check the Jupyter logs for the exception.",
      buttons: [Dialog.okButton({label: "Ok"})],
      title: "Something went wrong!",
    });
  }
};
