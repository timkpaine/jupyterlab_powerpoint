# jupyterlab_powerpoint
Creating PowerPoints from jupyter notebooks

[![Build Status](https://github.com/timkpaine/jupyterlab_powerpoint/workflows/Build%20Status/badge.svg?branch=main)](https://github.com/timkpaine/jupyterlab_powerpoint/actions?query=workflow%3A%22Build+Status%22)
[![codecov](https://codecov.io/gh/timkpaine/jupyterlab_powerpoint/branch/main/graph/badge.svg)](https://codecov.io/gh/timkpaine/jupyterlab_powerpoint)
[![GitHub issues](https://img.shields.io/github/issues/timkpaine/jupyterlab_powerpoint.svg)]()
[![PyPI](https://img.shields.io/pypi/l/jupyterlab_powerpoint.svg)](https://pypi.python.org/pypi/jupyterlab_powerpoint)
[![PyPI](https://img.shields.io/pypi/v/jupyterlab_powerpoint.svg)](https://pypi.python.org/pypi/jupyterlab_powerpoint)
[![npm](https://img.shields.io/npm/v/jupyterlab_powerpoint.svg)](https://www.npmjs.com/package/jupyterlab_powerpoint)


## Install

```bash
pip install jupyterlab_powerpoint
jupyter labextension install jupyterlab_powerpoint
jupyter serverextension enable --py jupyterlab_powerpoint
```

## Workflow

- Generate a notebook from a prexisting notebook (includes metadata necessary to reconstruct the original powerpoint)
- Parameterize notebook, modify parts/text/data
    + hook in to `Papermill`, leverage python, rexecute daily, etc
- Generate a powerpoint from the notebook
