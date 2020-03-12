# for Coverage
from mock import MagicMock
from jupyterlab_powerpoint.extension import load_jupyter_server_extension


class TestExtension:
    def test_load_jupyter_server_extension(self):

        m = MagicMock()
        load_jupyter_server_extension(m)
