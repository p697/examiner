import React from 'react';
import MdPage from './tools/md_to_com'

import './index.scss';

export default () => {

  return (
    <div className="help">
      <MdPage
        url='http://techo000.oss-cn-hangzhou.aliyuncs.com/%E5%A4%96%E5%8C%85/help.md'
      />
    </div>

  )
}