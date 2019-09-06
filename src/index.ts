import {
  ICommandPalette,
} from "@jupyterlab/apputils";

import {
  ILayoutRestorer, JupyterFrontEnd, JupyterFrontEndPlugin,
} from "@jupyterlab/application";

import {
  IDocumentManager,
} from "@jupyterlab/docmanager";

import {
  IFileBrowserFactory,
} from "@jupyterlab/filebrowser";

import {
  ILauncher,
} from "@jupyterlab/launcher";

import {
  IMainMenu,
} from "@jupyterlab/mainmenu";

import "../style/index.css";

// tslint:disable: variable-name

const extension: JupyterFrontEndPlugin<void> = {
  activate,
  autoStart: true,
  id: "jupyterlab_powerpoint",
  optional: [ILauncher],
  requires: [IDocumentManager, ICommandPalette, ILayoutRestorer, IMainMenu, IFileBrowserFactory],
};

function activate(app: JupyterFrontEnd,
                  docManager: IDocumentManager,
                  palette: ICommandPalette,
                  restorer: ILayoutRestorer,
                  mainMenu: IMainMenu,
                  browser: IFileBrowserFactory,
                  launcher: ILauncher | null) {

  // tslint:disable-next-line:no-console
  console.log("JupyterLab extension jupyterlab_powerpoint is activated!");
}

export default extension;
export {activate as _activate};
