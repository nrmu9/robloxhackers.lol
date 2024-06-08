import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { markedHighlight } from 'marked-highlight';
import 'highlight.js/styles/monokai.css'; // Import GitHub highlight.js style

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-', // Highlight.js CSS expects a prefix
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

const sanitizeMarkdown = (markdown: string): Promise<string> => {
  return Promise.resolve()
    .then(() => marked(markdown, { gfm: true, breaks: true }))
    .then((rawMarkup) => {
      // Configure DOMPurify to allow necessary elements and attributes
      return DOMPurify.sanitize(rawMarkup, {
        ALLOWED_TAGS: [
          'span', 'div', 'code', 'pre', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
          'ul', 'ol', 'li', 'blockquote', 'strong', 'em', 'br', 'table', 'thead', 
          'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: [
          'class', 'href', 'target', 'rel', 'title', 'style', 'data-*', 'aria-*', 
          'role', 'id', 'name'
        ],
        KEEP_CONTENT: true,
      });
    });
};

export default sanitizeMarkdown;
