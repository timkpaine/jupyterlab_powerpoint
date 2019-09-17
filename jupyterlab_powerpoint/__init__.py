from ._version import __version__  # noqa: F401
from .presentation import *  # noqa: F401, F403


def _jupyter_server_extension_paths():
    return [{
        "module": "jupyterlab_powerpoint.extension"
    }]
