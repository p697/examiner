import React, { useState } from 'react';
import CodeBlock from './code_block'
import './markdown.css'

const ReactMarkdown = require('react-markdown/with-html')

export default (props) => {
  const [mdStr, setMdStr] = useState('加载中...')

  fetch(props.url)
    .then((res) => res.text())
    .then(data => {
      setMdStr(data)
    })

  return (
    <div className="markdown-body">
      <ReactMarkdown 
        source={mdStr} 
        escapeHtml={false}
        renderers={{
          code: CodeBlock
        }}
      />
    </div>
  );
}



