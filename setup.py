from codecs import open
from os import path

from jupyter_packaging import (combine_commands, create_cmdclass,
                               ensure_python, ensure_targets, get_version,
                               install_npm)
from setuptools import find_packages, setup

pjoin = path.join

ensure_python(("2.7", ">=3.3"))

name = "jupyterlab_powerpoint"
here = path.abspath(path.dirname(__file__))
jshere = path.abspath(path.join(path.dirname(__file__), "js"))
version = get_version(pjoin(here, name, "_version.py"))

with open(path.join(here, "README.md"), encoding="utf-8") as f:
    long_description = f.read()

requires = [
    "jupyterlab>=3.5,<4",
    "nbconvert>=5.5.0",
    "nbformat>=4.4.0",
    "python-pptx>=0.6.0",
]

dev_requires = requires + [
    "pytest",
    "pytest-cov",
    "pylint",
    "flake8",
    "bump2version",
    "autopep8",
    "mock",
]

data_spec = [
    # Lab extension installed by default:
    (
        "share/jupyter/labextensions/jupyterlab_powerpoint",
        "jupyterlab_powerpoint/labextension",
        "**",
    ),
    # Config to enable server extension by default:
    ("etc/jupyter/jupyter_server_config.d", "jupyter-config", "*.json"),
]


cmdclass = create_cmdclass("js", data_files_spec=data_spec)
cmdclass["js"] = combine_commands(
    install_npm(jshere, build_cmd="build:all"),
    ensure_targets(
        [
            pjoin(jshere, "lib", "index.js"),
            pjoin(jshere, "style", "index.css"),
            pjoin(here, "jupyterlab_powerpoint", "labextension", "package.json"),
        ]
    ),
)


setup(
    name=name,
    version=version,
    description="Create powerpoints from jupyter notebooks",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/timkpaine/jupyterlab_powerpoint",
    author="Tim Paine",
    author_email="t.paine154@gmail.com",
    license="Apache 2.0",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Framework :: Jupyter",
    ],
    cmdclass=cmdclass,
    keywords="jupyter jupyterlab",
    packages=find_packages(
        exclude=[
            "tests",
        ]
    ),
    install_requires=requires,
    extras_require={"dev": dev_requires},
    include_package_data=True,
    zip_safe=False,
)
