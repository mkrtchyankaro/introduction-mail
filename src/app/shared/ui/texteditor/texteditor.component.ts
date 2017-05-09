import {
  Component,
  OnDestroy,
  AfterViewInit,
  Input,
} from '@angular/core';

// Core - these two are required :-)
import 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

// Plugins
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';

declare var tinymce: any;

@Component({
  selector: 'text-editor',
  template: `<textarea id="mytextarea"></textarea>`,
  styleUrls: ['./texteditor.component.scss']
})
export class TextEditorComponent implements AfterViewInit, OnDestroy {

  @Input() content: string;

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#mytextarea',
      skin_url: 'skins/custom',
      body_class: 'mail',
      content_css : 'skins/texteditor.css',
      plugins: [],
      menubar: false,  // removes the menubar
      toolbar: false, // 'bold italic',
      height: '100%',
      min_height: '100vh',
      statusbar: false,
      setup: editor => {
      this.editor = editor;
      editor.on('init', () => {
          editor.setContent(this.content);
      });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
