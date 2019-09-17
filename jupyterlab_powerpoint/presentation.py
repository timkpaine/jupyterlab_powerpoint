try:
    from functools import lru_cache
except (ImportError, ModuleNotFoundError):
    from functools32 import lru_cache
from copy import deepcopy
from pptx import Presentation as _pptx_presentation


class Part(object):
    def __init__(self, placeholder):
        self._placeholder = placeholder
        self._name = self._placeholder.name


class Slide(object):
    def __init__(self, slide_layout):
        self._slide_layout = slide_layout
        self._name = self._slide_layout.name
        self._parts = {ps.name: Part(ps) for ps in self._slide_layout.placeholders}

    @lru_cache(None)
    def parts(self):
        return list(self._parts.keys())

    def slide(self):
        return self._slide_layout

    def __len__(self):
        return len(self._parts)


class Presentation(object):
    def __init__(self, master=None):
        self._presentation = _pptx_presentation(master)
        self._slide_types = {s.name: Slide(s) for s in self._presentation.slide_layouts}

    def presentation(self):
        return self._presentation

    def slides(self):
        return self._presentation.slides

    @lru_cache(None)
    def slide_types(self):
        return list(self._slide_types.keys())

    def new_slide(self, type):
        if type not in self.slide_types():
            raise ValueError("Slide type not found: {}".format(type))
        return deepcopy(self._slide_types[type])

    def add_slide(self, slide):
        self.slides().add_slide(slide.slide())

    def __len__(self):
        return len(self.slides())
