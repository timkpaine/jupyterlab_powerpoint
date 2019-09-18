# for Coverage
from mock import patch, MagicMock
from jupyterlab_powerpoint import Presentation


class TestPresentation:
    def test_empty(self):
        p = Presentation('sample_master.pptx')
        assert len(p) == 0
        assert sorted(list(p.slide_types().keys())) == \
            sorted(['Title Slide', 'Title and Content',
                    'Section Header', 'Two Content', 'Comparison',
                    'Title Only', 'Blank', 'Content with Caption',
                    'Picture with Caption', 'Title and Vertical Text',
                    'Vertical Title and Text'])
        s = p.new_slide('Title and Content')
        assert len(s) == 0
        assert len(p) == 1

    def test_from_presentation(self):
        p = Presentation('sample_presentation.pptx')
        assert len(p) == 3

        assert sorted(list(p.slide_types().keys())) == \
            sorted(['Title Slide', 'Title and Content',
                    'Section Header', 'Two Content', 'Comparison',
                    'Title Only', 'Blank', 'Content with Caption',
                    'Picture with Caption', 'Title and Vertical Text',
                    'Vertical Title and Text'])
        s = p.new_slide('Title and Content')
        assert len(s) == 0
        assert len(p) == 4
