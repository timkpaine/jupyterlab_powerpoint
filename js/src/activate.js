import {generateSample} from "./run";
import {PowerpointTool} from "./tool";
// tslint:disable-next-line:max-line-length
import {isEnabled, POWERPOINT_CATEGORY, POWERPOINT_GENERATE_CAPTION, POWERPOINT_GENERATE_ID} from "./utils";

export function activate(app, docManager, palette, tracker, cellTools) {
  /* Add to cell tools sidebar */
  const testsTool = new PowerpointTool(app, tracker, cellTools);
  cellTools.addItem({tool: testsTool, rank: 1.9});

  /* Add to commands to sidebar */
  palette.addItem({command: POWERPOINT_GENERATE_ID, category: POWERPOINT_CATEGORY});

  app.commands.addCommand(POWERPOINT_GENERATE_ID, {
    caption: POWERPOINT_GENERATE_CAPTION,
    execute: () => {
      generateSample(app, docManager);
    },
    isEnabled: isEnabled(app, docManager),
    label: POWERPOINT_GENERATE_CAPTION,
  });
}
