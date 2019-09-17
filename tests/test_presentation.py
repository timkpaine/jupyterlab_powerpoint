# for Coverage
from mock import patch, MagicMock
from jupyterlab_powerpoint import Presentation


class TestPresentation:
    def test_basic(self):
        p = Presentation('sample_master.pptx')
        assert len(p) == 0
        assert p.slide_types() == ['Title Slide', 'Title and Content',
                                   'Section Header', 'Two Content', 'Comparison',
                                   'Title Only', 'Blank', 'Content with Caption',
                                   'Picture with Caption', 'Title and Vertical Text',
                                   'Vertical Title and Text']
        s = p.new_slide('Title and Content')
        assert len(s) == 5

        p.add_slide(s)
        assert len(p) == 1
