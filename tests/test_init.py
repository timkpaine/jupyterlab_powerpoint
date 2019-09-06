# for Coverage
from mock import patch, MagicMock
from jupyterlab_powerpoint import _jupyter_server_extension_paths


class TestInit:
    def test__jupyter_server_extension_paths(self):
        assert _jupyter_server_extension_paths() == [{"module": "jupyterlab_powerpoint.extension"}]
