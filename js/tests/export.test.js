/******************************************************************************
 *
 * Copyright (c) 2020, the jupyterlab_templates authors.
 *
 * This file is part of the jupyterlab_templates library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
import "isomorphic-fetch";

import * as extension from "../src/index";

describe("Checks exports", () => {
  test("Check extension", () => {
    expect(extension);
  });
});
